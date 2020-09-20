import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Golfer } from './schemas/golfer.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class GolfersService {
  constructor(@InjectModel(Golfer.name) private golferModel: Model<Golfer>) {}

  async getAll(): Promise<Golfer[]> {
    return this.golferModel.find().exec();
  }

  async create(golfer: Golfer): Promise<Types.ObjectId> {
    console.log('new golfer:', golfer);
    return Promise.resolve(new Types.ObjectId());
  }

}
