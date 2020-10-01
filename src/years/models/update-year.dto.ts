import { PartialType } from '@nestjs/mapped-types';
import { CreateYearDto } from './create-year.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateYearDto extends PartialType(CreateYearDto) {
  @IsOptional()
  @IsBoolean()
  public?: boolean;

  @IsOptional()
  @IsBoolean()
  current?: boolean;
}
