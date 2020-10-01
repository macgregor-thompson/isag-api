import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Team } from './models/team.schema';
import { CreateTeamDto } from './models/create-team.dto';
import { UpdateTeamDto } from './models/update-team.dto';
import { ObjectID } from 'mongodb';
import { Year } from '../years/models/year.schema';
import { Player } from '../players/models/player.schema';


@Injectable()
export class TeamsService {

  constructor(@InjectModel(Team.name) private teamModel: Model<Team>,
              @InjectConnection() private connection: Connection) {}

  async getByYear(year: number): Promise<Team[]> {
    return this.connection.collection(this.teamModel.collection.collectionName)
      .aggregate<Team>([
        { $match: { year } },
        {
          $lookup: {
            from: 'players',
            localField: 'playerA.playerId',
            foreignField: '_id',
            as: 'playerA',
          },
        },
        {
          $unwind: {
            path: '$playerA',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'players',
            localField: 'playerB.playerId',
            foreignField: '_id',
            as: 'playerB',
          },
        },
        {
          $unwind: {
            path: '$playerB',
            preserveNullAndEmptyArrays: true
          }
        },
      ]).toArray();
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

  async delete(teamId: string): Promise<Team> {
    return this.teamModel.findByIdAndDelete(teamId);
  }
}
