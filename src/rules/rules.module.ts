import { Module } from '@nestjs/common';
import { RulesController } from './rules.controller';
import { RulesService } from './rules.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rules, RulesSchema } from './models/rules.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rules.name, schema: RulesSchema }]),
  ],
  controllers: [RulesController],
  providers: [RulesService],
})
export class RulesModule {}
