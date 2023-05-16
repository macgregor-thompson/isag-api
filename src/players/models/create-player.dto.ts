import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Item } from '../../_shared/entities/item';

export class CreatePlayerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  // optional properties
  @IsOptional()
  @IsNumber()
  handicap: number;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  dateOfBirth: string;

  @IsOptional()
  @IsArray()
  favoriteActivities: Item[];
}
