import { Hole } from './hole';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateCourseDto {
  @IsString()
  name: string;

  @IsNumber()
  slope: number;

  @IsNumber()
  courseRating: number;

  @IsString()
  tees: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Hole)
  frontNine: Hole[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Hole)
  backNine: Hole[];

  @IsString()
  scorecardUrl: string;
}
