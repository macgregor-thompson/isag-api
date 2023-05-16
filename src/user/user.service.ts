import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/user.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from './models/create-user.dto';
import { Collection } from 'mongodb';
import { UpdateUserDto } from './models/update-user.dto';
import { Role } from './models/role.enum';

@Injectable()
export class UserService {
  collection: any;

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
              @InjectConnection() private readonly connection: Connection) {
    this.collection = this.connection.collection<User>(this.userModel.collection.collectionName);
  }

  async findOne(username: string): Promise<User> {
    return this.collection.findOne({username});
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find({}).exec();
  }

  async isUserNameTaken(username: string): Promise<boolean> {
    return (await this.collection.countDocuments({username})) > 0;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.role = Role.USER;
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
