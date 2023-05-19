import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { MongoHelper } from '../../_shared/mongo-helper';
import { UpdateScorecardDto } from './update-scorecard.dto';
import { TeamPlayer } from '../../teams/models/team-player';
import { Course } from '../../courses/models/course.schema';
import { PlayerScores } from './player-scores';
import { Scores } from './scores';
import { setShotsByHole } from '../helpers/set-shots-by-hole';
import { CreatePlayerScores } from './create-player-scores';

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
    course: Course,
  ) {
    super();
    console.log('CreateScorecardDto');

    this.playerAScores = new CreatePlayerScores(playerA, course);
    this.playerBScores = new CreatePlayerScores(playerB, course);
    this.teamNetScores = new Scores();
    Object.assign(this, partial);
  }
}
