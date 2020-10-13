import { PartialType } from '@nestjs/mapped-types';
import { CreateScorecardDto } from './create-scorecard.dto';
import { IsBoolean } from 'class-validator';

export class UpdateScorecardDto extends PartialType(CreateScorecardDto){
  @IsBoolean()
  deleted: boolean;
}
