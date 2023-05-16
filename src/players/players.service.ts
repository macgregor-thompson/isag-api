import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Connection, Model, Types } from 'mongoose';

import { Player } from './models/player.schema';
import { CreatePlayerDto } from './models/create-player.dto';
import { UpdatePlayerDto } from './models/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async getAll(): Promise<Player[]> {
    return this.connection
      .collection(this.playerModel.collection.collectionName)
      .aggregate<Player>([
        { $match: { deleted: { $ne: true } } },
        {
          $addFields: {
            lowerName: {
              $concat: [{ $toLower: '$firstName' }, { $toLower: '$lastName' }],
            },
          },
        },
        { $sort: { lowerName: 1 } },
        { $unset: 'lowerName' },
      ])
      .toArray();
  }

  async getByYear(year: number): Promise<Player[]> {
    const yearWithPlayers = await this.connection
      .collection('years')
      .aggregate<{ players: Player[] }>([
        { $match: { year } },
        {
          $lookup: {
            from: this.playerModel.collection.collectionName,
            localField: 'playerIds',
            foreignField: '_id',
            as: 'players',
          },
        },
      ])
      .toArray();

    return yearWithPlayers[0].players;
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = new this.playerModel(createPlayerDto);
    return this.playerModel.create(player);
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const existingPlayer = await this.playerModel
      .findOneAndUpdate({ _id: id }, { $set: updatePlayerDto }, { new: true })
      .exec();

    if (!existingPlayer) {
      throw new NotFoundException(`Player #${id} not found`);
    }
    return existingPlayer;
  }
}
