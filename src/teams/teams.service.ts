import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Team } from './models/team.schema';
import { CreateTeamDto } from './models/create-team.dto';
import { UpdateTeamDto } from './models/update-team.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @InjectConnection() private connection: Connection,
  ) {}

  async getByYear(year: number): Promise<Team[]> {
    const teams: Team[] = await this.connection
      .collection(this.teamModel.collection.collectionName)
      .aggregate<Team>([
        { $match: { year, deleted: { $ne: true } } },
        {
          $lookup: {
            from: 'players',
            localField: 'playerA.playerId',
            foreignField: '_id',
            as: 'playerADetails',
          },
        },
        {
          $unwind: {
            path: '$playerADetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'players',
            localField: 'playerB.playerId',
            foreignField: '_id',
            as: 'playerBDetails',
          },
        },
        {
          $unwind: {
            path: '$playerBDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    teams.forEach((t) => {
      t.playerA = Object.assign(t.playerADetails, t.playerA);
      t.playerB = Object.assign(t.playerBDetails, t.playerB);
    });

    return teams;
  }

  async getById(teamId: ObjectId): Promise<Team> {
    const team = await (
      await this.connection
        .collection(this.teamModel.collection.collectionName)
        .aggregate<Team>([
          { $match: { _id: teamId } },
          {
            $lookup: {
              from: 'players',
              localField: 'playerA.playerId',
              foreignField: '_id',
              as: 'playerADetails',
            },
          },
          {
            $unwind: {
              path: '$playerADetails',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: 'players',
              localField: 'playerB.playerId',
              foreignField: '_id',
              as: 'playerBDetails',
            },
          },
          {
            $unwind: {
              path: '$playerBDetails',
              preserveNullAndEmptyArrays: true,
            },
          },
        ])
        .toArray()
    )[0];

    team.playerA = Object.assign(team.playerADetails, team.playerA);
    team.playerB = Object.assign(team.playerBDetails, team.playerB);

    return team;
  }

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = new this.teamModel(createTeamDto);
    return this.teamModel.create(team);
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const existingTeam = await this.teamModel
      .findOneAndUpdate({ _id: id }, { $set: updateTeamDto }, { new: true })
      .exec();

    if (!existingTeam) {
      throw new NotFoundException(`Team #${id} not found`);
    }
    return existingTeam;
  }
}
