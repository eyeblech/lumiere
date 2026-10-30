import { ERAS } from './eras';
import { MILESTONES_PART_1 } from './milestonesPart1';
import { MILESTONES_PART_2 } from './milestonesPart2';
import { MILESTONES_UNDERGROUND } from './milestonesUnderground';
import { MILESTONES_CANNES_AND_MOVEMENTS } from './milestonesCannesAndMovements';
import { MILESTONES_ADDITIONAL } from './milestonesAdditional';
import { CINEMA_MOVEMENTS, CANNES_MILESTONES } from './movementsAndCannesData';
import { REAL_POSTER_URLS } from './posterUrls';
import { LUMINARIES } from './luminariesData';
import { CinemaMilestone, Era, EraId } from './types';

const seenIds = new Set<string>();
const seenTitles = new Set<string>();

export const MILESTONES: CinemaMilestone[] = [
  ...MILESTONES_PART_1,
  ...MILESTONES_PART_2,
  ...MILESTONES_UNDERGROUND,
  ...MILESTONES_CANNES_AND_MOVEMENTS,
  ...MILESTONES_ADDITIONAL,
]
  .filter((m) => {
    const normTitle = m.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seenIds.has(m.id) || seenTitles.has(normTitle)) {
      return false;
    }
    seenIds.add(m.id);
    seenTitles.add(normTitle);
    return true;
  })
  .map((m) => ({
    ...m,
    posterUrl: m.posterUrl || REAL_POSTER_URLS[m.id],
  }))
  .sort((a, b) => a.year - b.year);

export { ERAS, LUMINARIES, CINEMA_MOVEMENTS, CANNES_MILESTONES };

export function getEraById(eraId: EraId): Era {
  return ERAS.find((e) => e.id === eraId) || ERAS[0];
}

export function getMilestoneById(id: string): CinemaMilestone | undefined {
  return MILESTONES.find((m) => m.id === id);
}
