import { IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { MongoHelper } from '../../_shared/mongo-helper';

export class Player {

  @Type(() => ObjectID)
  @Transform(MongoHelper.toObjectId, { toClassOnly: true })
  playerId: ObjectID;

  @IsNumber()
  handicap: number;
}
