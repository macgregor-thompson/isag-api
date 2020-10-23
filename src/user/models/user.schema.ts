import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role.enum';

@Schema()
export class User extends Document {
  @Prop()
  username?: string;

  @Prop()
  password?: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  role: Role;

  @Prop()
  playerId?: string;

  withoutCreds(): User {
    delete this.username;
    delete this.password;
    return this;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
