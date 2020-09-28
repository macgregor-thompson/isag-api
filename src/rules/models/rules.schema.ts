import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rules extends Document {
  @Prop()
  year: number;

  @Prop()
  html: string;

}

export const RulesSchema = SchemaFactory.createForClass(Rules);
