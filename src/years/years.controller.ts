import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { YearsService } from './years.service';
import { Year } from './models/year.schema';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreateYearDto } from './models/create-year.dto';
import { UpdateYearDto } from './models/update-year.dto';

@Controller('years')
export class YearsController {
  constructor(private yearsService: YearsService) {}

  @Get()
  async getAll(): Promise<Year[]> {
    return this.yearsService.getAll();
  }

  @Get(':year')
  async getYearWithPlayers(@Param('year') year: number): Promise<Year[]> {
    return this.yearsService.getYearWithPlayers(year);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createYearDto: CreateYearDto): Promise<Year> {
    return this.yearsService.create(createYearDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() update: UpdateYearDto): Promise<Year> {
    return this.yearsService.update(id, update);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/SetCurrent')
  async setCurrent(@Param('id') id): Promise<Year> {
    const currentYear = await this.yearsService.getCurrentYear();
    const [, current] = await Promise.all([
      this.yearsService.update(currentYear._id, { current: false }),
      this.yearsService.update(id, { current: true }),
    ]);
    return current;
  }
}
