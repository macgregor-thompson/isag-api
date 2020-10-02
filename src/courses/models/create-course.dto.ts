import { Hole } from './hole';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NineHoles } from './nine-holes';


export class CreateCourseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsNumber()
  slope: number;

  @IsNumber()
  courseRating: number;

  @IsString()
  tees: string;

  @ValidateNested()
  @Type(() => NineHoles)
  frontNine: NineHoles

  @ValidateNested()
  @Type(() => NineHoles)
  backNine: NineHoles

  @IsNumber()
  frontNineYards: number;

  @IsNumber()
  backNineYards: number;

  @IsNumber()
  frontNinePar: number;

  @IsNumber()
  backNinePar: number;

  @IsString()
  scorecardUrl: string;
}
