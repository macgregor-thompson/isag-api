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
import { PairingsService } from './pairings.service';
import { Pairing } from './models/pairing.schema';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreatePairingDto } from './models/create-pairing.dto';
import { UpdatePairingDto } from './models/update-pairing.dto';

@Controller('pairings')
export class PairingsController {
  constructor(private pairingsService: PairingsService) {}

  @Get(':year')
  async getByYear(@Param('year') year: number): Promise<Pairing[]> {
    return this.pairingsService.getByYear(year);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() payload: CreatePairingDto): Promise<Pairing> {
    return this.pairingsService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('All')
  async createAll(@Body() payload: CreatePairingDto[]): Promise<Pairing[]> {
    return this.pairingsService.createAll(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() update: UpdatePairingDto): Promise<Pairing> {
    return this.pairingsService.update(id, update);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id): Promise<void> {
    return this.pairingsService.delete(id);
  }
}
