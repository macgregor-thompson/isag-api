import { Module } from '@nestjs/common';
import { ScorecardsController } from './scorecards.controller';
import { ScorecardsService } from './scorecards.service';

@Module({
  controllers: [ScorecardsController],
  providers: [ScorecardsService]
})
export class ScorecardsModule {}
