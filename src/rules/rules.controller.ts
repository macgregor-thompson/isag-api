import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { RulesService } from './rules.service';
import { Rules } from './models/rules.schema';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreateRulesDto } from './models/create-rules.dto';
import { UpdateRulesDto } from './models/update-rules.dto';

@Controller('rules')
export class RulesController {

  constructor(private rulesService: RulesService) {
  }

  @Get()
  async getByYear(@Query('year') year: number): Promise<Rules> {
    return this.rulesService.getByYear(year);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createRulesDto: CreateRulesDto): Promise<Rules> {
    return this.rulesService.create(createRulesDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() update: UpdateRulesDto): Promise<Rules> {
    return this.rulesService.update(id, update);
  }

}
