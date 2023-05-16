import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Expose, Transform, Type } from 'class-transformer';
import { MongoHelper } from '../../_shared/mongo-helper';

export class TeamPlayer {
  @IsNotEmpty()
  @Transform(({ value }) => MongoHelper.toObjectId(value), {
    toClassOnly: true,
  })
  @Expose({ name: '_id' })
  playerId: ObjectId;

  @IsNumber()
  handicap: number;

  @IsBoolean()
  isPlusHandicap: boolean;

  @IsNumber()
  courseHandicap: number;

  @IsNumber()
  numShots: number;
}
