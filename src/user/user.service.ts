import { Injectable } from '@nestjs/common';
import { User } from './models/user.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from './models/create-user.dto';
import { Collection } from 'mongodb';

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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return this.userModel.create(user);
  }
}
