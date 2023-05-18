import { IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { MongoHelper } from '../../_shared/mongo-helper';

export class UpdatePairingDto {
  @IsOptional()
  @Type(() => ObjectId)
  @Transform(({ value }) => MongoHelper.toObjectId(value), {
    toClassOnly: true,
  })
  teamAId?: ObjectId;

  @IsOptional()
  @Type(() => ObjectId)
  @Transform(({ value }) => MongoHelper.toObjectId(value), {
    toClassOnly: true,
  })
  teamBId?: ObjectId;

  @IsOptional()
  @IsString()
  teeTime?: string;
}
