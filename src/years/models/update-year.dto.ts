import { PartialType } from '@nestjs/mapped-types';
import { CreateYearDto } from './create-year.dto';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { Expense } from './expense';
import { Type } from 'class-transformer';

export class UpdateYearDto extends PartialType(CreateYearDto) {
  @IsOptional()
  @IsBoolean()
  public?: boolean;

  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;

  @IsOptional()
  @IsArray()
  // @Transform((values) => values.map(MongoHelper.toObjectId), { toClassOnly: true })
  paidPlayerIds?: ObjectId[];

  @IsOptional()
  @IsNumber()
  playerDues?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Expense)
  @ValidateNested({ each: true })
  expenses?: Expense[];

  @IsOptional()
  @IsArray()
  @Type(() => Expense)
  @ValidateNested({ each: true })
  prizes?: Expense[];

  @IsOptional()
  @IsNumber()
  firstPlacePercentage?: number;

  @IsOptional()
  @IsNumber()
  secondPlacePercentage?: number;

  @IsOptional()
  @IsNumber()
  thirdPlacePercentage?: number;

  @IsOptional()
  @IsBoolean()
  scoresConfirmed?: boolean;

  @IsOptional()
  @IsNumber()
  handicapAllowance?: number;
}
