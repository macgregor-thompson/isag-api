import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TeamPlayer } from './team-player';

@Schema()
export class Team extends Document {
  @Prop()
  year: number;

  @Prop()
  playerA: TeamPlayer;

  @Prop()
  playerB: TeamPlayer;

  @Prop()
  deleted: boolean;

}

export const TeamSchema = SchemaFactory.createForClass(Team);
