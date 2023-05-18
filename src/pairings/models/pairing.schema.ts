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

  constructor() {
    super();
    this.scoringId = makeScorecardId(3);
  }
}

export const PairingSchema = SchemaFactory.createForClass(Pairing);

function makeScorecardId(length): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
