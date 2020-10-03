import { IsNumber, IsString } from 'class-validator';

export class Expense {
  @IsString()
  name: string;

  @IsNumber()
  cost: number;
}
