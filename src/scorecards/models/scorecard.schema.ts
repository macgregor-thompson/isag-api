import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Scores } from './scores';
import { ObjectId } from 'mongodb';
import { PlayerScores } from './player-scores';
import Ty from 'mongoose';

@Schema()
export class Scorecard extends Document {
  @Prop()
  year: number;

  @Prop()
  scoringId: string;

  @Prop()
  teamId: ObjectId;

  @Prop()
  courseId: ObjectId;

  @Prop()
  playerAScores: PlayerScores;

  @Prop()
  playerBScores: PlayerScores;

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

  @Prop()
  confirmed: boolean;

  // for active leaderboard

  @Prop()
  currentNetToPar: number;

  @Prop()
  thru: number;
}

export const ScorecardSchema = SchemaFactory.createForClass(Scorecard);
