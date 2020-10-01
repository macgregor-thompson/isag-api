import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CoursesService } from './courses.service';
import { Course } from './models/course.schema';
import { CreateCourseDto } from './models/create-course.dto';
import { UpdateCourseDto } from './models/update-course.dto';

@Controller('courses')
export class CoursesController {

  constructor(private coursesService: CoursesService) {}

  @Get()
  async getAll(@Req() request: Request): Promise<Course[]> {
    return this.coursesService.getAll();
  }

  @Get()
  async getByYear(@Query('year') year: number): Promise<Course> {
    return this.coursesService.getByYear(year);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() update: UpdateCourseDto): Promise<Course> {
    return this.coursesService.update(id, update);
  }
}
