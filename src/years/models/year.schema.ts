import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

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

}

export const YearSchema = SchemaFactory.createForClass(Year);
