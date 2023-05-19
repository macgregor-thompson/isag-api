import { PlayerScores } from '../models/player-scores';
import { Course } from '../../courses/models/course.schema';
import { Hole } from '../../courses/models/hole';
import { ShotsByHole } from '../models/shots-by-hole';

export function setShotsByHole(
  playerScores: PlayerScores,
  course: Course,
): PlayerScores {
  const holes = Array.from({ length: 18 }, (_, i) => i + 1);
  const fullEighteen: { [key: number]: Hole } = {
    ...course.frontNine,
    ...course.backNine,
  };
  const holesByIndex = Object.keys(fullEighteen).reduce((acc, key) => {
    acc[fullEighteen[key].handicap] = key;
    return acc;
  }, {});

  playerScores.shotsByHole = new ShotsByHole();

  if (playerScores.playingHandicap === 0) return;

  if (playerScores.playingHandicap < 0) {
    let index = -playerScores.playingHandicap;
    const tripsAround = Math.floor(index / 18);
    if (tripsAround) {
      holes.forEach((h) => (playerScores.shotsByHole[h] = tripsAround));
      index = index - tripsAround * 18;
    }
    if (index) {
      let holeIndex = 1;
      while (index > 0) {
        playerScores.shotsByHole[holesByIndex[holeIndex]]++;
        index--;
        holeIndex++;
      }
    }
  } else {
    let index = playerScores.playingHandicap;
    const tripsAround = Math.floor(index / 18);
    if (tripsAround) {
      holes.forEach((h) => (playerScores.shotsByHole[h] = -tripsAround));
      index = index - tripsAround * 18;
    }
    if (index) {
      let holeIndex = 18;
      while (index > 0) {
        playerScores.shotsByHole[holesByIndex[holeIndex]]--;
        index--;
        holeIndex--;
      }
    }
  }
  return playerScores;
}
