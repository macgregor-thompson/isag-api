import { IsNumber, IsOptional } from 'class-validator';
import { ObjectID } from 'mongodb';
import { Expose, Transform, Type } from 'class-transformer';
import { MongoHelper } from '../../_shared/mongo-helper';

export class TeamPlayer {

  @IsOptional() // not really optional, but kept getting stripped out without it...
  @Transform(MongoHelper.toObjectId, { toClassOnly: true })
  @Type()
  @Expose({name: '_id'})
  playerId:  ObjectID;

  @IsNumber()
  handicap: number;

  @IsNumber()
  courseHandicap: number;

  @IsNumber()
  numShots: number;
}
