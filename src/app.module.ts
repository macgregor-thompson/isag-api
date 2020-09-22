import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GolfersModule } from './golfers/golfers.module';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL), GolfersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
