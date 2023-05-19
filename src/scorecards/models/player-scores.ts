import { Prop } from '@nestjs/mongoose';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OptionalScores } from './optional-scores';
import { ObjectId } from 'mongodb';
import { ShotsByHole } from './shots-by-hole';


export class PlayerScores {
  @IsOptional()
  @ValidateNested()
  @Type(() => OptionalScores)
  grossScores: OptionalScores;

  @Prop()
  frontNineGrossScore: number;

  @Prop()
  backNineGrossScore: number;

  @Prop()
  totalGrossScore: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => OptionalScores)
  netScores: OptionalScores;

  @Prop()
  frontNineNetScore: number;

  @Prop()
  backNineNetScore: number;

  @Prop()
  totalNetScore: number;

  @Prop()
  playerId: ObjectId;

  @Prop()
  courseHandicap: number;

  @Prop()
  playingHandicap: number;

  @Prop()
  shotsByHole: ShotsByHole;
}
