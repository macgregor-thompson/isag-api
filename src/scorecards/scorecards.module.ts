import { Module } from '@nestjs/common';
import { ScorecardsController } from './scorecards.controller';
import { ScorecardsService } from './scorecards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Scorecard, ScorecardSchema } from './models/scorecard.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Scorecard.name, schema: ScorecardSchema }])
  ],
  controllers: [ScorecardsController],
  providers: [ScorecardsService]
})
export class ScorecardsModule {}
