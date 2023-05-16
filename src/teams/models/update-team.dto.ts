import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsOptional()
  @IsBoolean()
  deleted?: boolean;

  @IsOptional()
  @IsNumber()
  winningBid: number;

  @IsOptional()
  @IsString()
  winningBidder: string;

  @IsOptional()
  @IsDate()
  teeTime: Date;
}
