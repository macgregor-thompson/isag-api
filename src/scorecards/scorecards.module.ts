import { Module } from '@nestjs/common';
import { ScorecardsController } from './scorecards.controller';
import { ScorecardsService } from './scorecards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Scorecard, ScorecardSchema } from './models/scorecard.schema';
import { TeamsModule } from '../teams/teams.module';
import { PairingsModule } from '../pairings/pairings.module';
import { CoursesModule } from '../courses/courses.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    TeamsModule,
    PairingsModule,
    CoursesModule,
    EventsModule,
    MongooseModule.forFeature([
      { name: Scorecard.name, schema: ScorecardSchema },
    ]),
  ],
  controllers: [ScorecardsController],
  providers: [ScorecardsService],
})
export class ScorecardsModule {}
