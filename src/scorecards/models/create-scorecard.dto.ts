import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { MongoHelper } from '../../_shared/mongo-helper';
import { UpdateScorecardDto } from './update-scorecard.dto';
import { TeamPlayer } from '../../teams/models/team-player';

export class CreateScorecardDto extends UpdateScorecardDto {
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @Type(() => ObjectId)
  @Transform(({ value }) => MongoHelper.toObjectId(value), {
    toClassOnly: true,
  })
  teamId: ObjectId;

  @IsNotEmpty()
  @Type(() => ObjectId)
  @Transform(({ value }) => MongoHelper.toObjectId(value), {
    toClassOnly: true,
  })
  courseId: ObjectId;

  constructor(
    partial: Partial<CreateScorecardDto>,
    playerA: TeamPlayer,
    playerB: TeamPlayer,
  ) {
    super(playerA, playerB);
    Object.assign(this, partial);
  }
}

function makeScorecardId(length): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
