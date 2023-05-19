import { IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { MongoHelper } from '../../_shared/mongo-helper';

export class Player {
  @Type(() => ObjectId)
  @Transform(({ value }) => MongoHelper.toObjectId(value), {
    toClassOnly: true,
  })
  playerId: ObjectId;

  @IsNumber()
  handicap: number;
}
