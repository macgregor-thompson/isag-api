import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { TeamsService } from './teams.service';
import { Team } from './models/team.schema';
import { CreateTeamDto } from './models/create-team.dto';
import { UpdateTeamDto } from './models/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

  @Get()
  async getTeamsByYear(@Query('year') year: number): Promise<Team[]> {
    return this.teamService.getByYear(year);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.create(createTeamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() update: UpdateTeamDto): Promise<Team> {
    return this.teamService.update(id, update);
  }
}
