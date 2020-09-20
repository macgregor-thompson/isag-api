import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GolfersModule } from './golfers/golfers.module';

const atlasURI = 'mongodb+srv://iSagAdmin:isuckatgolf@isag.yjdsm.mongodb.net/isag?retryWrites=true&w=majority'

@Module({
  imports: [MongooseModule.forRoot(atlasURI), GolfersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
