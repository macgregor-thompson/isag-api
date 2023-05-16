import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Scorecard } from './models/scorecard.schema';
import { CreateScorecardDto } from './models/create-scorecard.dto';
import { UpdateScorecardDto } from './models/update-scorecard.dto';

@Injectable()
export class ScorecardsService {

  constructor(@InjectModel(Scorecard.name) private readonly ScorecardModel: Model<Scorecard>,
              @InjectConnection() private readonly connection: Connection) {}

  async getAll(): Promise<Scorecard[]> {
    return this.ScorecardModel.find({ deleted: { $ne: true } }).exec();
  }

  async getByYear(year: number): Promise<Scorecard[]> {
    return this.connection.collection(this.ScorecardModel.collection.collectionName)
      .aggregate<Scorecard>([
        {
          $match: {
            year,
            deleted: {$ne: true}
          }
        },
        { $sort: { totalNetScore: 1 } },
        {
          $lookup: {
            from: 'teams',
            localField: 'teamId',
            foreignField: '_id',
            as: 'team'
          }
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
      ]).toArray();
  }

  async create(createScorecardDto: CreateScorecardDto): Promise<Scorecard> {
    const Scorecard = new this.ScorecardModel(createScorecardDto);
    return this.ScorecardModel.create(Scorecard);
  }

  async update(id: string, updateScorecardDto: UpdateScorecardDto): Promise<Scorecard> {
    const existingScorecard = await this.ScorecardModel
      .findOneAndUpdate({ _id: id }, { $set: updateScorecardDto }, { new: true })
      .exec();

    if (!existingScorecard) {
      throw new NotFoundException(`Scorecard #${id} not found`);
    }
    return existingScorecard;
  }
}
