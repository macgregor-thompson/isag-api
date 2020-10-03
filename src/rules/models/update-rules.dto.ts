import { PartialType } from '@nestjs/mapped-types';
import { CreateRulesDto } from './create-rules.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRulesDto extends PartialType(CreateRulesDto) {
  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
