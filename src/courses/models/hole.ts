import { IsNumber } from 'class-validator';

export class Hole {
  @IsNumber()
  par: number;

  @IsNumber()
  yardage: number;

  @IsNumber()
  handicap: number;
}
