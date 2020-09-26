import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Connection, Model } from 'mongoose';

import { Year } from './models/year.schema';
import { Player } from '../players/models/player.schema';

@Injectable()
export class YearsService {
  constructor(@InjectModel(Year.name) private yearModel: Model<Year>,
              @InjectConnection() private connection: Connection) {}

  async getAll(): Promise<Year[]> {
    return this.yearModel.find().exec();
  }

  async getYearWithPlayers(year: number): Promise<Array<Year & { players: Player[] }>> {
    return this.connection.collection(this.yearModel.collection.collectionName)
      .aggregate<Year & { players: Player[] }>([
        { $match: { year } },
        {
          $lookup: {
            from: 'players',
            localField: 'playerIds',
            foreignField: '_id',
            as: 'players',
          },
        },
      ]).toArray();
  }
}
