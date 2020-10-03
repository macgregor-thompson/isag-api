import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Course } from './models/course.schema';
import { CreateCourseDto } from './models/create-course.dto';
import { UpdateCourseDto } from './models/update-course.dto';

@Injectable()
export class CoursesService {

  constructor(@InjectModel(Course.name) private readonly courseModel: Model<Course>,
              @InjectConnection() private readonly connection: Connection) {}

  async getAll(): Promise<Course[]> {
    return this.courseModel.find({ deleted: { $ne: true } }).exec();
  }

  async getByYear(year: number): Promise<Course> {
    return this.courseModel.findOne({ year }).exec();
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new this.courseModel(createCourseDto);
    console.log('new course:', course);
    return this.courseModel.create(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const existingCourse = await this.courseModel
      .findOneAndUpdate({ _id: id }, { $set: updateCourseDto }, { new: true })
      .exec();

    if (!existingCourse) {
      throw new NotFoundException(`Course #${id} not found`);
    }
    return existingCourse;
  }
}
