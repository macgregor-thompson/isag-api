import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/user.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from './models/create-user.dto';
import { Collection } from 'mongodb';
import { UpdatePlayerDto } from '../players/models/update-player.dto';
import { Player } from '../players/models/player.schema';
import { UpdateUserDto } from './models/update-user.dto';

@Injectable()
export class UserService {
  collection: Collection;

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
              @InjectConnection() private readonly connection: Connection) {
    this.collection = this.connection.collection(this.userModel.collection.collectionName);
  }

  async findOne(username: string): Promise<User> {
    return this.collection.findOne({username});
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find({}).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return this.userModel.create(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }
    return existingUser;
  }
}
