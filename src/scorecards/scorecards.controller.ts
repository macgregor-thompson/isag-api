import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ScorecardsService } from './scorecards.service';
import { Scorecard } from './models/scorecard.schema';
import { CreateScorecardDto } from './models/create-scorecard.dto';
import { UpdateScorecardDto } from './models/update-scorecard.dto';
import { MongoHelper } from '../_shared/mongo-helper';
import { ObjectId } from 'mongodb';
import { NotFoundException } from '../_shared/exceptions';

@Controller('scorecards')
export class ScorecardsController {
  constructor(private scorecardService: ScorecardsService) {}

  @Get(':year')
  async getByYear(@Param('year') year: number): Promise<Scorecard[]> {
    return this.scorecardService.getByYear(year);
  }

  @Get(':year/Leaderboard')
  async getLeaderboardByYear(
    @Param('year') year: number,
  ): Promise<Scorecard[]> {
    return this.scorecardService.getCurrentLeaderboard(year);
  }

  @Get(':year/OhShit')
  async ohShit(
      @Param('year') year: number,
  ): Promise<void> {
    await this.scorecardService.updateShotsByHole(year);
  }

  @Get(':year/MyPairingScorecards/:scoringId')
  async getMyPairingScorecards(
    @Param('year') year: number,
    @Param('scoringId') scoringId: string,
  ): Promise<Scorecard[]> {
    const cards = await this.scorecardService.getByScoringId(year, scoringId);
    if (cards?.length) return cards;
    throw new NotFoundException();
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() payload: CreateScorecardDto): Promise<Scorecard> {
    return this.scorecardService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':year/CreateTeamScorecards')
  async createTeamScorecards(
    @Param('year') year: number,
    @Body() courseId: ObjectId,
  ): Promise<Scorecard[]> {
    return this.scorecardService.createTeamScorecards(
      year,
      MongoHelper.toObjectId(courseId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':year/UpdateTeeTimes')
  async updateTeeTimes(
    @Param('year') year: number,
    @Body() { teamIds, teeTime }: { teamIds: string[]; teeTime: string },
  ): Promise<void> {
    return this.scorecardService.updateTeeTimes(year, teamIds, { teeTime });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id,
    @Body() update: UpdateScorecardDto,
  ): Promise<Scorecard> {
    return this.scorecardService.update(id, update);
  }

  @Patch(':id/MyPairingScorecards')
  async updateScores(
    @Param('id') id,
    @Body() update: UpdateScorecardDto,
  ): Promise<Scorecard> {
    return this.scorecardService.updateScores(id, update);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':year/UpdateShotsByHole')
  async updateShotsByHole(@Param('year') year: number): Promise<void> {
    return this.scorecardService.updateShotsByHole(year);
  }
}
