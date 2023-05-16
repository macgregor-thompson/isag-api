import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Scores } from './scores';
import { OptionalScores } from './optional-scores';
import { ObjectId } from 'mongodb';

@Schema()
export class Scorecard extends Document {
  @Prop()
  year: number;

  @Prop()
  teamId: ObjectId;

  @Prop()
  courseId: ObjectId;

  @Prop()
  playerANetScores: OptionalScores;

  @Prop()
  playerBNetScores: OptionalScores;

  @Prop()
  teamNetScores: Scores;

  @Prop()
  frontNineNetScore: number;

  @Prop()
  backNineNetScore: number;

  @Prop()
  totalNetScore: number;

  @Prop()
  deleted: boolean;
}

export const ScorecardSchema = SchemaFactory.createForClass(Scorecard);
