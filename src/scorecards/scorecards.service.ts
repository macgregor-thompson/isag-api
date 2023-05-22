import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Scorecard } from './models/scorecard.schema';
import { CreateScorecardDto } from './models/create-scorecard.dto';
import { UpdateScorecardDto } from './models/update-scorecard.dto';
import { ObjectId } from 'mongodb';
import { TeamsService } from '../teams/teams.service';
import { PairingsService } from '../pairings/pairings.service';
import { CoursesService } from '../courses/courses.service';
import { setShotsByHole } from './helpers/set-shots-by-hole';
import { merge as _merge } from 'lodash';
import { MongoHelper } from '../_shared/mongo-helper';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class ScorecardsService {
  constructor(
    @InjectModel(Scorecard.name)
    private readonly ScorecardModel: Model<Scorecard>,
    @InjectConnection() private readonly connection: Connection,
    private readonly teamService: TeamsService,
    private readonly pairingsService: PairingsService,
    private readonly coursesService: CoursesService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async getByYear(year: number): Promise<Scorecard[]> {
    return this.connection
      .collection(this.ScorecardModel.collection.collectionName)
      .aggregate<Scorecard>([
        {
          $match: {
            year,
            deleted: false,
          },
        },
        { $sort: { totalNetScore: 1 } },
        ...this.scorecardAggregations(),
      ])
      .toArray();
  }

  async getCurrentLeaderboard(year: number): Promise<Scorecard[]> {
    return this.connection
      .collection(this.ScorecardModel.collection.collectionName)
      .aggregate<Scorecard>([
        {
          $match: {
            year,
            deleted: false,
          },
        },
        { $sort: { currentNetToPar: 1 } },
        ...this.scorecardAggregations(),
      ])
      .toArray();
  }

  async getByScoringId(year: number, scoringId: string): Promise<Scorecard[]> {
    const { teamAId, teamBId } = await this.pairingsService.getByScoringId(
      scoringId,
    );

    if (!teamAId || !teamBId) return;

    return this.connection
      .collection(this.ScorecardModel.collection.collectionName)
      .aggregate<Scorecard>([
        {
          $match: {
            year,
            teamId: { $in: [new ObjectId(teamAId), new ObjectId(teamBId)] },
          },
        },
        ...this.scorecardAggregations(),
      ])
      .toArray();
  }

  async create(createScorecardDto: CreateScorecardDto): Promise<Scorecard> {
    const Scorecard = new this.ScorecardModel(createScorecardDto);
    return this.ScorecardModel.create(Scorecard);
  }

  async createTeamScorecards(
    year: number,
    courseId: ObjectId,
  ): Promise<Scorecard[]> {
    const [teams, course] = await Promise.all([
      this.teamService.getSimpleTeams(year),
      this.coursesService.getByYear(year),
    ]);
    const scorecards = teams.map(
      ({ playerA, playerB, ...team }) =>
        new this.ScorecardModel(
          new CreateScorecardDto(
            {
              year,
              teamId: team._id,
              courseId,
            },
            playerA,
            playerB,
            course,
          ),
        ),
    );
    return this.ScorecardModel.insertMany(scorecards);
  }

  async update(
    id: string,
    updateScorecardDto: UpdateScorecardDto,
  ): Promise<Scorecard> {
    const existingScorecard = await this.ScorecardModel.findOneAndUpdate(
      { _id: id },
      { $set: updateScorecardDto },
      { new: true },
    ).exec();

    if (!existingScorecard) {
      throw new NotFoundException(`Scorecard #${id} not found`);
    }
    return existingScorecard;
  }

  async updateTeeTimes(
    year: number,
    teamIds: string[],
    teeTime: { teeTime: string },
  ): Promise<void> {
    const result = await this.ScorecardModel.updateMany(
      { year, teamId: { $in: teamIds.map(MongoHelper.toObjectId) } },
      { $set: teeTime },
    ).exec();

    if (!result.matchedCount) {
      throw new NotFoundException(`Scorecard(s) not found`);
    }
  }

  async updateScores(
    id: string,
    { playerAScores, playerBScores, ...payload }: UpdateScorecardDto,
  ): Promise<Scorecard> {

    const update = {
      ...payload,
      ...MongoHelper.flattenRecordToSparseMongoUpdate(
        playerAScores,
        'playerAScores',
      ),
      ...MongoHelper.flattenRecordToSparseMongoUpdate(
        playerBScores,
        'playerBScores',
      ),
    };

    const afterUpdate = await this.update(id, update);

    this.eventsGateway.scoreCardUpdated();

    return afterUpdate;
  }

  async updateShotsByHole(year: number): Promise<void> {
    const course = await this.coursesService.getByYear(year);
    const allCards = await this.ScorecardModel.find({ year });
    const teams = await this.teamService.getSimpleTeams(2023);

    const bulkUpdates = [];

    allCards.forEach(({ _id, playerAScores, playerBScores, teamId }) => {
      const team = teams.find(t => t._id.toHexString() === teamId.toHexString());
      const scoresA = setShotsByHole(playerAScores, course);
      const scoresB = setShotsByHole(playerBScores, course)
      bulkUpdates.push({
        updateOne: {
          filter: { _id },
          update: {
            $set: {
              playerAScores: _merge(team.playerA,
                  {grossScores: playerAScores.grossScores, netScores: playerAScores.netScores, shotsByHole: scoresA.shotsByHole}),
              playerBScores: _merge(team.playerB,
                  {grossScores: playerBScores.grossScores, netScores: playerBScores.netScores, shotsByHole: scoresB.shotsByHole}),
            },
          },
        },
      });
    });
    await this.ScorecardModel.bulkWrite(bulkUpdates);
  }

  scorecardAggregations(): object[] {
    return [
      {
        $lookup: {
          from: 'teams',
          localField: 'teamId',
          foreignField: '_id',
          as: 'team',
        },
      },
      {
        $unwind: {
          path: '$team',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'players',
          localField: 'team.playerA.playerId',
          foreignField: '_id',
          as: 'team.playerA',
        },
      },

      {
        $unwind: {
          path: '$team.playerA',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'players',
          localField: 'team.playerB.playerId',
          foreignField: '_id',
          as: 'team.playerB',
        },
      },
      {
        $unwind: {
          path: '$team.playerB',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
  }
}
