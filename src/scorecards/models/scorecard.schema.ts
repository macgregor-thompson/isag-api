import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Score } from './score';

@Schema()
export class Scorecard extends Document {
  @Prop()
  year: number;

  @Prop()
  teamId: string;

  @Prop()
  courseId: string;

  @Prop()
  playerAScores: Score[];

  @Prop()
  playerBScores: Score[];

  @Prop()
  scores: Score[];

  @Prop()
  totalScore: number;

  @Prop()
  deleted: boolean;

}

export const ScorecardSchema = SchemaFactory.createForClass(Scorecard);

