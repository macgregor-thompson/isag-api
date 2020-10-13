import { PartialType } from '@nestjs/mapped-types';
import { Scores } from './scores';

export class OptionalScores extends PartialType(Scores){}
