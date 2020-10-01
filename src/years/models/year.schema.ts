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
  playerIds: ObjectID[];

}

export const YearSchema = SchemaFactory.createForClass(Year);
