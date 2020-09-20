import { Module } from '@nestjs/common';
import { GolfersController } from './golfers.controller';
import { GolfersService } from './golfers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Golfer, GolferSchema } from './schemas/golfer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Golfer.name, schema: GolferSchema }])],
  controllers: [GolfersController],
  providers: [GolfersService]
})
export class GolfersModule {}
