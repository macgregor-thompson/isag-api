import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ScorecardsService } from './scorecards.service';
import { Scorecard } from './models/scorecard.schema';
import { CreateScorecardDto } from './models/create-scorecard.dto';
import { UpdateScorecardDto } from './models/update-scorecard.dto';

@Controller('scorecards')
export class ScorecardsController {
  constructor(private scorecardService: ScorecardsService) {}

  @Get()
  async getAll(@Req() request: Request): Promise<Scorecard[]> {
    return this.scorecardService.getAll();
  }

  @Get(':year')
  async getByYear(@Param('year') year: number): Promise<Scorecard[]> {
    return this.scorecardService.getByYear(year);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createScorecardDto: CreateScorecardDto,
  ): Promise<Scorecard> {
    return this.scorecardService.create(createScorecardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id,
    @Body() update: UpdateScorecardDto,
  ): Promise<Scorecard> {
    return this.scorecardService.update(id, update);
  }
}
