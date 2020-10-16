import { PartialType } from '@nestjs/mapped-types';
import { CreateScorecardDto } from './create-scorecard.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateScorecardDto extends PartialType(CreateScorecardDto){
  @IsOptional()
  @IsBoolean()
  deleted: boolean;
}
