import { Controller, Get, Param } from '@nestjs/common';
import { YearsService } from './years.service';
import { Year } from './models/year.schema';

@Controller('years')
export class YearsController {

  constructor(private yearsService: YearsService) {}

  @Get()
  async getAll(): Promise<Year[]>{
    return this.yearsService.getAll();
  }

  @Get(':year')
  async getYearWithPlayers(@Param('year') year: string): Promise<Year[]>{
    return this.yearsService.getYearWithPlayers(parseInt(year, 10));
  }

}
