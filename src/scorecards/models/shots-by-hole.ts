import { IsNumber } from 'class-validator';

export class ShotsByHole {
  @IsNumber()
  1: number;

  @IsNumber()
  2: number;

  @IsNumber()
  3: number;

  @IsNumber()
  4: number;

  @IsNumber()
  5: number;

  @IsNumber()
  6: number;

  @IsNumber()
  7: number;

  @IsNumber()
  8: number;

  @IsNumber()
  9: number;

  @IsNumber()
  10: number;

  @IsNumber()
  11: number;

  @IsNumber()
  12: number;

  @IsNumber()
  13: number;

  @IsNumber()
  14: number;

  @IsNumber()
  15: number;

  @IsNumber()
  16: number;

  @IsNumber()
  17: number;

  @IsNumber()
  18: number;

  constructor() {
    const holes = Array.from({ length: 18 }, (_, i) => i + 1);
    holes.forEach((h) => (this[h] = 0));
  }
}
