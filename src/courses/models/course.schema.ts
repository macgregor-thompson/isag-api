import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NineHoles } from './nine-holes';


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
  frontNine: NineHoles;

  @Prop()
  backNine: NineHoles;

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
}

export const CourseSchema = SchemaFactory.createForClass(Course);

