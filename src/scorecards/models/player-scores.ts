import { Prop } from '@nestjs/mongoose';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { OptionalScores } from './optional-scores';
import { ObjectId } from 'mongodb';
import { ShotsByHole } from './shots-by-hole';
import { MongoHelper } from '../../_shared/mongo-helper';


export class PlayerScores {
  @IsOptional()
  @ValidateNested()
  @Type(() => OptionalScores)
  grossScores: OptionalScores;

  @IsOptional()
  @IsNumber()
  frontNineGrossScore: number;

  @IsOptional()
  @IsNumber()
  backNineGrossScore: number;

  @IsOptional()
  @IsNumber()
  totalGrossScore: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => OptionalScores)
  netScores: OptionalScores;

  @IsOptional()
  @IsNumber()
  frontNineNetScore: number;

  @IsOptional()
  @IsNumber()
  backNineNetScore: number;

  @IsOptional()
  @IsNumber()
  totalNetScore: number;

  @IsOptional()
  @Type(() => ObjectId)
  @Transform(({ value }) => MongoHelper.toObjectId(value), {
    toClassOnly: true,
  })
  playerId: ObjectId;

  @IsOptional()
  @IsNumber()
  courseHandicap: number;

  @IsOptional()
  @IsNumber()
  playingHandicap: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ShotsByHole)
  shotsByHole: ShotsByHole;
}
