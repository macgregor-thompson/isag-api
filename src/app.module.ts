import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { ScorecardsModule } from './scorecards/scorecards.module';
import { YearsModule } from './years/years.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RulesModule } from './rules/rules.module';
import { TeamsModule } from './teams/teams.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PlayersModule,
    ScorecardsModule,
    YearsModule,
    AuthModule,
    UserModule,
    RulesModule,
    TeamsModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {
}
