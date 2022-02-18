import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { RulesService } from './rules.service';
import { Rules } from './models/rules.schema';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UpdateRulesDto } from './models/update-rules.dto';

@Controller('rules')
export class RulesController {

  constructor(private rulesService: RulesService) {
  }

  @Get()
  async get(): Promise<Rules> {
    return this.rulesService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() update: UpdateRulesDto): Promise<Rules> {
    return this.rulesService.update(id, update);
  }

}
