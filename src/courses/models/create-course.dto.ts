import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FrontNine } from './front-nine';
import { BackNine } from './back-nine';


export class CreateCourseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNumber()
  slope: number;

  @IsOptional()
  @IsNumber()
  courseRating: number;

  @IsString()
  tees: string;

  @ValidateNested()
  @Type(() => FrontNine)
  frontNine: FrontNine

  @ValidateNested()
  @Type(() => BackNine)
  backNine: BackNine

  @IsNumber()
  frontNineYards: number;

  @IsNumber()
  backNineYards: number;

  @IsNumber()
  frontNinePar: number;

  @IsNumber()
  backNinePar: number;

  @IsOptional()
  @IsString()
  scorecardUrl: string;
}
