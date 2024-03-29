import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PlayerScores } from './player-scores';
import { OptionalScores } from './optional-scores';

export class UpdateScorecardDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PlayerScores)
  playerAScores?: PlayerScores;

  @IsOptional()
  @ValidateNested()
  @Type(() => PlayerScores)
  playerBScores?: PlayerScores;

  @IsOptional()
  @ValidateNested()
  @Type(() => OptionalScores)
  teamNetScores?: OptionalScores;

  @IsOptional()
  @IsNumber()
  frontNineNetScore?: number;

  @IsOptional()
  @IsNumber()
  backNineNetScore?: number;

  @IsOptional()
  @IsNumber()
  totalNetScore?: number;

  @IsOptional()
  @IsNumber()
  totalGrossScore?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  confirmed? = false;

  @IsOptional()
  @IsBoolean()
  deleted? = false;

  @IsOptional()
  @IsNumber()
  currentNetToPar?: number;

  @IsOptional()
  @IsNumber()
  thru?: number;

  @IsOptional()
  @IsString()
  teeTime?: string;
}
