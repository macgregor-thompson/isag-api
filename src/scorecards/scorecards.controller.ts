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
import { BaseController } from '../_shared/base-controller';
import { NotFoundException } from '../_shared/exceptions';


@Controller('scorecards')
export class ScorecardsController extends BaseController {
  constructor(private scorecardService: ScorecardsService) {
    super();
  }

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

  @Get(':year/MyTeamScorecard/:scoringId')
  async getMyTeamScorecard(
    @Param('year') year: number,
    @Param('scoringId') scoringId: string,
  ): Promise<Scorecard> {
    const card = await this.scorecardService.getByScoringId(year, scoringId);
    console.log('card:', card);

    if (card) return card;
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
  @Patch(':id')
  async update(
    @Param('id') id,
    @Body() update: UpdateScorecardDto,
  ): Promise<Scorecard> {
    return this.scorecardService.update(id, update);
  }
}
