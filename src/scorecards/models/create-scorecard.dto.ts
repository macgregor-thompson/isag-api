import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Scores } from './scores';
import { OptionalScores } from './optional-scores';
import { ObjectID } from 'mongodb';
import { MongoHelper } from '../../_shared/mongo-helper';

export class CreateScorecardDto {

  @IsNumber()
  year: number;

  @IsOptional() // must be here for validation
  @Type(() => ObjectID)
  @Transform(MongoHelper.toObjectId, { toClassOnly: true })
  teamId: ObjectID;

  @IsOptional() // must be here for validation
  @Type(() => ObjectID)
  @Transform(MongoHelper.toObjectId, { toClassOnly: true })
  courseId: ObjectID;

  @ValidateNested()
  @Type(() => Scores)
  teamNetScores: Scores;

  @IsNumber()
  frontNineNetScore: number;

  @IsNumber()
  backNineNetScore: number;

  @IsNumber()
  totalNetScore: number;


  // optional
  @IsOptional()
  @ValidateNested()
  @Type(() => OptionalScores)
  playerANetScores?: OptionalScores;

  @IsOptional()
  @IsNumber()
  playerAFrontNineNetScore: number;

  @IsOptional()
  @IsNumber()
  playerABackNineNetScore: number;

  @IsOptional()
  @IsNumber()
  playerATotalNetScore: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => OptionalScores)
  playerBNetScores?: OptionalScores;

  @IsOptional()
  @IsNumber()
  playerBFrontNineNetScore: number;

  @IsOptional()
  @IsNumber()
  playerBBackNineNetScore: number;

  @IsOptional()
  @IsNumber()
  playerBTotalNetScore: number;

}
