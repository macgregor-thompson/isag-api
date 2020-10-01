import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Connection, Model } from 'mongoose';

import { Year } from './models/year.schema';
import { Player } from '../players/models/player.schema';
import { CreateYearDto } from './models/create-year.dto';
import { UpdateYearDto } from './models/update-year.dto';

@Injectable()
export class YearsService {
  constructor(@InjectModel(Year.name) private yearModel: Model<Year>,
              @InjectConnection() private connection: Connection) {}

  async getAll(): Promise<Year[]> {
    return this.yearModel.find({public: {$ne: false}}).exec();
  }

  async getCurrentYear(): Promise<Year> {
    return this.yearModel.findOne({current: true, public: {$ne: false}}).exec();
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

  async create(createYearDto: CreateYearDto): Promise<Year> {
    const year = new this.yearModel(createYearDto);
    return this.yearModel.create(year);
  }

  async update(id: string, updateYearDto: UpdateYearDto): Promise<Year> {
    const existingYear = await this.yearModel
      .findOneAndUpdate({ _id: id }, { $set: updateYearDto }, { new: true })
      .exec();

    if (!existingYear) {
      throw new NotFoundException(`Year #${id} not found`);
    }
    return existingYear;
  }

  async delete(yearId: string): Promise<Year> {
    return this.yearModel.findByIdAndDelete(yearId);
  }
}
