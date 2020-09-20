import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { GolfersService } from './golfers.service';
import { Golfer } from './schemas/golfer.schema';
import { Types } from "mongoose";

@Controller('golfers')
export class GolfersController {
  constructor(private golferService: GolfersService) {}

  @Get()
  getAll(@Req() request: Request): Promise<Golfer[]> {
    return this.golferService.getAll();
  }

  @Post()
  async create(@Body() golfer: Golfer): Promise<Types.ObjectId> {
    return this.golferService.create(golfer);
  }
}
