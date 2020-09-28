import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Connection, Model } from 'mongoose';

import { Rules } from './models/rules.schema';
import { UpdateRulesDto } from './models/update-rules.dto';
import { CreateRulesDto } from './models/create-rules.dto';

@Injectable()
export class RulesService {
  constructor(@InjectModel(Rules.name) private readonly rulesModel: Model<Rules>,
              @InjectConnection() private readonly connection: Connection) {}

  async getByYear(year: number): Promise<Rules> {
    return this.rulesModel.findOne({year}).exec();
  }

  async create(createRulesDto: CreateRulesDto): Promise<Rules> {
    const rules = new this.rulesModel(createRulesDto);

    const existingRules = await this.rulesModel.findOne({ year: rules.year }).exec();

    if (existingRules) {
      throw new UnauthorizedException(`Rules for #${rules.year} already exists`);
    }

    return this.rulesModel.create(rules);
  }

  async update(id: string, updateRulesDto: UpdateRulesDto): Promise<Rules> {
    const existingRules = await this.rulesModel
      .findOneAndUpdate({ _id: id }, { $set: updateRulesDto }, { new: true })
      .exec();

    if (!existingRules) {
      throw new NotFoundException(`Rules #${id} not found`);
    }
    return existingRules;
  }
}
