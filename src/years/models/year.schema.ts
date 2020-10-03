import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
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
  aPlayerIds: ObjectID[];

  @Prop()
  bPlayerIds: ObjectID[];

  @Prop()
  deleted: boolean;

  @Prop()
  paidPLayerIds: ObjectID[];

  @Prop()
  unpaidPlayerIds: ObjectID[];

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

}

export const YearSchema = SchemaFactory.createForClass(Year);
