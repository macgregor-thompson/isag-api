import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Expense } from './expense';

@Schema()
export class Year extends Document {
  //_id: string;

  @Prop()
  year: number;

  @Prop()
  date: Date;

  @Prop()
  current: boolean;

  @Prop()
  public: boolean;

  @Prop()
  aPlayerIds: ObjectId[];

  @Prop()
  bPlayerIds: ObjectId[];

  @Prop()
  deleted: boolean;

  @Prop()
  paidPLayerIds: ObjectId[];

  @Prop()
  unpaidPlayerIds: ObjectId[];

  @Prop()
  playerDues: number;

  @Prop()
  expenses: Expense[];

  @Prop()
  prizes: Expense[];

  @Prop()
  firstPlacePercentage: number;

  @Prop()
  secondPlacePercentage: number;

  @Prop()
  thirdPlacePercentage: number;

  @Prop()
  completed: boolean;

  @Prop({ type: Number })
  handicapAllowance = 100;
}

export const YearSchema = SchemaFactory.createForClass(Year);
