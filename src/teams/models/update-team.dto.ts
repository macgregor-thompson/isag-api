import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
