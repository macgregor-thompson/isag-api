import { Hole } from './hole';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FrontNine {
  @ValidateNested()
  @Type(() => Hole)
  1: Hole;

  @ValidateNested()
  @Type(() => Hole)
  2: Hole;

  @ValidateNested()
  @Type(() => Hole)
  3: Hole;

  @ValidateNested()
  @Type(() => Hole)
  4: Hole;

  @ValidateNested()
  @Type(() => Hole)
  5: Hole;

  @ValidateNested()
  @Type(() => Hole)
  6: Hole;

  @ValidateNested()
  @Type(() => Hole)
  7: Hole;

  @ValidateNested()
  @Type(() => Hole)
  8: Hole;

  @ValidateNested()
  @Type(() => Hole)
  9: Hole;
}
