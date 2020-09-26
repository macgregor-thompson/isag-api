import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Item } from '../../_shared/entities/item';

@Schema()
export class Player extends Document {

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  handicap: number;

  @Prop()
  deleted: boolean;

  @Prop()
  bio: string;

  @Prop()
  nickname: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  iSagWinner: boolean;

  @Prop()
  dateOfBirth: string;

  @Prop()
  favoriteActivities: Item[];

}

export const PlayerSchema = SchemaFactory.createForClass(Player);
