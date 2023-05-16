import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TeamPlayer } from './team-player';
import { Player } from '../../players/models/player';

@Schema()
export class Team extends Document {
  @Prop()
  year: number;

  @Prop()
  teeTime: Date;

  @Prop()
  playerA: TeamPlayer;

  @Prop()
  playerB: TeamPlayer;

  @Prop()
  deleted: boolean;

  @Prop()
  winningBid: number;

  @Prop()
  winningBidder: string;

  // aggregation only
  playerADetails?: Player;
  playerBDetails?: Player;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
