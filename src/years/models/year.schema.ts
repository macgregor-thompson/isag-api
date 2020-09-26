import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Year extends Document {

  @Prop()
  year: number;

  @Prop()
  course: string;

  @Prop()
  date: Date;

  @Prop()
  playerIds: Types.ObjectId[];

}

export const YearSchema = SchemaFactory.createForClass(Year);
