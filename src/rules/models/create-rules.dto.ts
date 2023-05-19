import { IsNumber, IsString } from 'class-validator';

export class CreateRulesDto {
  @IsNumber()
  year: number;

  @IsString()
  html: string;
}
