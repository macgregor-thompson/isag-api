import { Document } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Score } from '../../courses/models/score';

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

}

export const ScorecardSchema = SchemaFactory.createForClass(Scorecard);

