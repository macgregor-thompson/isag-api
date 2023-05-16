import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Scorecard } from './models/scorecard.schema';
import { CreateScorecardDto } from './models/create-scorecard.dto';
import { UpdateScorecardDto } from './models/update-scorecard.dto';
import { ObjectId } from 'mongodb';
import { TeamsService } from '../teams/teams.service';

@Injectable()
export class ScorecardsService {
  constructor(
    @InjectModel(Scorecard.name)
    private readonly ScorecardModel: Model<Scorecard>,
    @InjectConnection() private readonly connection: Connection,
    private readonly teamService: TeamsService,
  ) {}

  async getByYear(year: number): Promise<Scorecard[]> {
    return this.connection
      .collection(this.ScorecardModel.collection.collectionName)
      .aggregate<Scorecard>([
        {
          $match: {
            year,
            deleted: false,
            confirmed: true,
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

  async getByScoringId(year: number, scoringId: string): Promise<Scorecard> {
    return this.connection
      .collection(this.ScorecardModel.collection.collectionName)
      .aggregate<Scorecard>([
        { $match: { year, scoringId } },
        ...this.scorecardAggregations(),
      ])
      .next();
  }

  async create(createScorecardDto: CreateScorecardDto): Promise<Scorecard> {
    const Scorecard = new this.ScorecardModel(createScorecardDto);
    return this.ScorecardModel.create(Scorecard);
  }

  async createTeamScorecards(
    year: number,
    courseId: ObjectId,
  ): Promise<Scorecard[]> {
    const teams = await this.teamService.getSimpleTeams(year);
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
