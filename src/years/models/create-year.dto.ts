import { IsArray, IsDate, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { MongoHelper } from '../../_shared/mongo-helper';
import { ObjectID } from 'mongodb';

export class CreateYearDto {
  @IsNumber()
  year: number;

  @IsDate()
  date: Date;

  @IsOptional()
  @IsArray()
  @Transform(ids => ids.map(MongoHelper.toObjectId), { toClassOnly: true })
  aPlayerIds: ObjectID[];

  @IsOptional()
  @IsArray()
  @Transform(ids => ids.map(MongoHelper.toObjectId), { toClassOnly: true })
  bPlayerIds: ObjectID[];
}
