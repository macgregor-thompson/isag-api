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

  @Prop({
    type: String,
    required: true,
    enum: Role,
  })
  role: Role;

  @Prop()
  playerId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
