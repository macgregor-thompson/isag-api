import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Hole } from './hole';


export class Course extends Document {
  @Prop()
  name: string;

  @Prop()
  slope: number;

  @Prop()
  courseRating: number;

  @Prop()
  tees: string;

  @Prop()
  frontNine: Hole[];

  @Prop()
  backNine: Hole[];

  @Prop()
  scorecardUrl: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

