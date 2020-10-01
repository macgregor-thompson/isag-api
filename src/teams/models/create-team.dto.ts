import { IsNumber, IsObject, ValidateNested } from 'class-validator';
import { TeamPlayer } from './team-player';
import { Type } from 'class-transformer';

export class CreateTeamDto {
  @IsNumber()
  year: number;

  @ValidateNested()
  @Type(() => TeamPlayer)
  playerA: TeamPlayer;

  @ValidateNested()
  @Type(() => TeamPlayer)
  playerB: TeamPlayer;
}


