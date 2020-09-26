import { Document } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role.enum';

export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  role: Role;

  @Prop()
  playerId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
