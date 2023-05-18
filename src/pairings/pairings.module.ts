import { Module } from '@nestjs/common';
import { PairingsController } from './pairings.controller';
import { PairingsService } from './pairings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pairing, PairingSchema } from './models/pairing.schema';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [
    TeamsModule,
    MongooseModule.forFeature([{ name: Pairing.name, schema: PairingSchema }]),
  ],
  controllers: [PairingsController],
  providers: [PairingsService],
})
export class PairingsModule {}
