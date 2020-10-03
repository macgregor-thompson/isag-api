import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FrontNine } from './front-nine';
import { BackNine } from './back-nine';

@Schema()
export class Course extends Document {
  @Prop()
  name: string;

  @Prop()
  year: number;

  @Prop()
  slope: number;

  @Prop()
  courseRating: number;

  @Prop()
  tees: string;

  @Prop()
  frontNine: FrontNine;

  @Prop()
  backNine: BackNine;

  @Prop()
  frontNineYards: number;

  @Prop()
  backNineYards: number;

  @Prop()
  frontNinePar: number;

  @Prop()
  backNinePar: number;

  @Prop()
  scorecardUrl: string;

  @Prop()
  deleted: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

