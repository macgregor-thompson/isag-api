import { CreatePlayerDto } from './create-player.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {

  @IsOptional()
  @IsString()
  avatarUrl: string;

  @IsOptional()
  @IsBoolean()
  deleted: boolean;
}
