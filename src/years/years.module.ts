import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { YearsController } from './years.controller';
import { YearsService } from './years.service';
import { Year, YearSchema } from './models/year.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Year.name, schema: YearSchema }])],
  controllers: [YearsController],
  providers: [YearsService]
})
export class YearsModule {}
