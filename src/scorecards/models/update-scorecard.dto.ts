import { PartialType } from '@nestjs/mapped-types';
import { CreateScorecardDto } from './create-scorecard.dto';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PlayerScores } from './player-scores';
import { OptionalScores } from './optional-scores';
import { TeamPlayer } from '../../teams/models/team-player';
import { Scores } from './scores';

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
  teamNetScores: OptionalScores;

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
  @IsNumber()
  totalGrossScore: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  confirmed = false;

  @IsOptional()
  @IsBoolean()
  deleted = false;

  @IsOptional()
  @IsNumber()
  currentNetToPar: number;

  @IsOptional()
  @IsNumber()
  thru: number;

  constructor(playerA: TeamPlayer, playerB: TeamPlayer) {
    this.playerAScores = new PlayerScores(playerA);
    this.playerBScores = new PlayerScores(playerB);
    this.teamNetScores = new Scores();
  }
}
