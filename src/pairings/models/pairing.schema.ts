import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Team } from '../../teams/models/team.schema';

@Schema()
export class Pairing extends Document {
  @Prop()
  year: number;

  @Prop()
  teamAId: ObjectId;

  @Prop()
  teamBId: ObjectId;

  @Prop()
  teeTime: string;

  @Prop()
  scoringId: string;

  @Prop()
  ordinal: number;

  // only used in aggregation
  teamA?: Team;
  teamB?: Team;
}

export const PairingSchema = SchemaFactory.createForClass(Pairing);
