import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Pairing } from './models/pairing.schema';
import { TeamsService } from '../teams/teams.service';
import { Team } from '../teams/models/team.schema';
import { CreatePairingDto } from './models/create-pairing.dto';
import { ObjectId } from 'mongodb';
import { UpdatePairingDto } from './models/update-pairing.dto';

@Injectable()
export class PairingsService {
  constructor(
    @InjectModel(Pairing.name)
    private readonly PairingModel: Model<Pairing>,
    @InjectConnection() private readonly connection: Connection,
    private readonly teamService: TeamsService,
  ) {}

  async getByYear(year: number): Promise<Pairing[]> {
    const [pairings, teams] = await Promise.all([
      this.connection
        .collection(this.PairingModel.collection.collectionName)
        .aggregate<Pairing>([{ $match: { year } }, { $sort: { ordinal: 1 } }])
        .toArray(),
      this.teamService.getByYear(year),
    ]);

    const teamsById: { [key: string]: Team } = teams.reduce((acc, team) => {
      acc[team._id.toString()] = team;
      return acc;
    }, {});

    pairings.forEach((p) => {
      p.teamA = teamsById[p.teamAId.toString()];
      p.teamB = teamsById[p.teamBId.toString()];
    });

    return pairings;
  }

  async getByScoringId(scoringId: string): Promise<Pairing> {
    const regex = new RegExp(`^${scoringId}$`, 'i');
    const pairing = await this.PairingModel.findOne({ scoringId: regex });
    if (!pairing) throw new NotFoundException(`Pairing not found`);
    return pairing;
  }

  async create(pairing: CreatePairingDto): Promise<Pairing> {
    const Pairing = new this.PairingModel(pairing);
    return this.PairingModel.create(Pairing);
  }

  async createAll(pairings: CreatePairingDto[]): Promise<Pairing[]> {
    const Pairings = pairings.map((p) => new this.PairingModel(p));
    await this.PairingModel.deleteMany({ year: pairings[0].year }).exec();
    await this.PairingModel.create(Pairings);
    return this.getByYear(pairings[0].year);
  }

  async update(
    _id: ObjectId,
    update: Partial<UpdatePairingDto>,
  ): Promise<Pairing> {
    const pairing = await this.PairingModel.findOneAndUpdate(
      { _id },
      { $set: update },
      { new: true },
    ).exec();

    if (!pairing) {
      throw new NotFoundException(`pairing #${_id} not found`);
    }
    return pairing;
  }

  async delete(_id: ObjectId): Promise<void> {
    await this.PairingModel.deleteOne({ _id });
  }
}
