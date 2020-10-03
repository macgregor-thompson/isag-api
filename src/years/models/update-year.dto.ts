import { PartialType } from '@nestjs/mapped-types';
import { CreateYearDto } from './create-year.dto';
import { IsArray, IsBoolean, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Prop } from '@nestjs/mongoose';
import { ObjectID } from 'mongodb';
import { Expense } from './expense';
import { Transform, Type } from 'class-transformer';
import { MongoHelper } from '../../_shared/mongo-helper';

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
  @Transform(ids => ids.map(MongoHelper.toObjectId), { toClassOnly: true })
  paidPlayerIds: ObjectID[];

  @IsOptional()
  @IsNumber()
  playerDues: number;

  @IsOptional()
  @IsArray()
  @Type(() => Expense)
  @ValidateNested({each: true})
  expenses: Expense[];

  @IsOptional()
  @IsArray()
  @Type(() => Expense)
  @ValidateNested({each: true})
  prizes: Expense[];

  @IsOptional()
  @IsNumber()
  firstPlacePercentage: number;

  @IsOptional()
  @IsNumber()
  secondPlacePercentage: number;

  @IsOptional()
  @IsNumber()
  thirdPlacePercentage: number;
}
