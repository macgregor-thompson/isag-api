import { Hole } from './hole';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BackNine {
  @ValidateNested()
  @Type(() => Hole)
  10: Hole;

  @ValidateNested()
  @Type(() => Hole)
  11: Hole;

  @ValidateNested()
  @Type(() => Hole)
  12: Hole;

  @ValidateNested()
  @Type(() => Hole)
  13: Hole;

  @ValidateNested()
  @Type(() => Hole)
  14: Hole;

  @ValidateNested()
  @Type(() => Hole)
  15: Hole;

  @ValidateNested()
  @Type(() => Hole)
  16: Hole;

  @ValidateNested()
  @Type(() => Hole)
  17: Hole;

  @ValidateNested()
  @Type(() => Hole)
  18: Hole;

}
