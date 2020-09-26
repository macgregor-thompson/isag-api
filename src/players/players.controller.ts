import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { PlayersService } from './players.service';
import { Player } from './models/player.schema';
import { CreatePlayerDto } from './models/create-player.dto';
import { UpdatePlayerDto } from './models/update-player.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get()
  async getAll(@Req() request: Request): Promise<Player[]> {
    return this.playersService.getAll();
  }

  @Get()
  async getByYear(@Query('year') year: number): Promise<Player[]> {
    return this.playersService.getByYear(year);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playersService.create(createPlayerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() update: UpdatePlayerDto): Promise<Player> {
    return this.playersService.update(id, update);
  }

}
