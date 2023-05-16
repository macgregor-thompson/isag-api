import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './models/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
