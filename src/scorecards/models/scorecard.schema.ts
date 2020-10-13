import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Scores } from './scores';
import { OptionalScores } from './optional-scores';
import { ObjectID } from '../../_shared/mongo-helper';

@Schema()
export class Scorecard extends Document {
  @Prop()
  year: number;

  @Prop()
  teamId: ObjectID;

  @Prop()
  courseId: ObjectID;

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

