import { PlayerScores } from './player-scores';
import { Scores } from './scores';
import { setShotsByHole } from '../helpers/set-shots-by-hole';
import { Player } from '../../players/models/player';
import { Course } from '../../courses/models/course.schema';

export class CreatePlayerScores extends PlayerScores {
  constructor(player: Player, course: Course) {
    super();
    Object.assign(this, player);
    this.grossScores = new Scores();
    this.netScores = new Scores();
    setShotsByHole(this, course);
  }
}
