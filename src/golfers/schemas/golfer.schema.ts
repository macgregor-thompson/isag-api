import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Golfer extends Document {
  @Prop()
  _id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  ghinNumber?: string;

  @Prop()
  ghinIndex: number;
}

export const GolferSchema = SchemaFactory.createForClass(Golfer);
