import { evaluate } from 'mathjs';

export enum UserDinoLevelsPurpose {
  PLAYER = 'OverrideMaxExperiencePointsPlayer',
  DINO = 'OverrideMaxExperiencePointsDino',
}

interface UserDinoLevels {
  /**
   * The number of levels that the user has.
   * This is the number of levels that the user can level up to.
   */
  numberOfLevels: number;

  /**
   * The base levels are the levels that the user starts with.
   * For some reason we have to add these in addition to the number of levels.
   * The weird part is we get the number of levels as the final amount, we just ignore the
   * other base levels that are added.
   */
  baseLevels: number;

  /**
   * The growth per level is the percentage increase of the previous level.
   * For example, if the growth per level is 0.1, the experience points for level 2
   * would be 1 * 0.1 + 1 = 1.1. The experience points for level 3 would be 1.1 * 0.1 + 2 = 1.21.
   */
  growthPerLevel: number;

  /**
   * The purpose of the user dino levels. This can be either player or dino.
   * This is needed because the experience points for the player and dino are different
   * as well as the settings key that is used.
   */
  purpose: UserDinoLevelsPurpose;
}

export default ({ numberOfLevels, baseLevels = 104, growthPerLevel, purpose }: UserDinoLevels): string => {
  const experiencePointsForLevel = [];
  let previousValue = 1;
  for (let i = 0; i < numberOfLevels + baseLevels; i++) {
    /**
     * Adding the previous value to the previous value times the growth per level plus the current level.
     * We want the current level (i) so we can ensure the experience points are unique.
     * If the level is greater than the number of levels, we want to add the additional levels
     * but aren't concerned with the experience points because they are not used for the additional levels
     * because you kill bosses, use chibis, etc. to level up.
     */
    if (i < numberOfLevels) previousValue += evaluate(`(${previousValue} * ${growthPerLevel}) + ${i}`);

    experiencePointsForLevel.push(`ExperiencePointsForLevel[${i}]=${Number(previousValue.toFixed(0))}`);
  }

  const levelExperienceRampOverrides = `LevelExperienceRampOverrides=(${experiencePointsForLevel.join(',')})`;
  const overrideMaxExperiencePointsPlayer = `${purpose}=${Number(previousValue.toFixed(0)) + 1}`;

  return `${levelExperienceRampOverrides}\n${overrideMaxExperiencePointsPlayer}`;
};
