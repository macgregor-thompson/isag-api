import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { ScorecardsModule } from './scorecards/scorecards.module';
import { YearsModule } from './years/years.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PlayersModule,
    ScorecardsModule,
    YearsModule,
    AuthModule,
    UserModule,

  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {
}
