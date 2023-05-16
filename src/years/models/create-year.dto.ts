import { IsArray, IsDate, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { MongoHelper } from '../../_shared/mongo-helper';
import { ObjectId } from 'mongodb';

export class CreateYearDto {
  @IsNumber()
  year: number;

  @IsDate()
  date: Date;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.map(MongoHelper.toObjectId), {
    toClassOnly: true,
  })
  aPlayerIds: ObjectId[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.map(MongoHelper.toObjectId), {
    toClassOnly: true,
  })
  bPlayerIds: ObjectId[];
}
