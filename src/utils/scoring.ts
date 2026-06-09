import { Match } from '../data/mockData';
import { Prediction, ProfileRow } from '../services/poolApi';

export const EXACT_SCORE_POINTS = 3;
export const CORRECT_OUTCOME_POINTS = 1;

export interface LeaderboardEntry {
  userId: string;
  name: string;
  points: number;
  exact: number;
  correct: number;
  predictionsMade: number;
}

type Outcome = 'home' | 'away' | 'draw';

function outcome(home: number, away: number): Outcome {
  if (home > away) return 'home';
  if (away > home) return 'away';
  return 'draw';
}

/** Points for a single prediction against a finished match. */
export function scorePrediction(prediction: Prediction, match: Match): number {
  if (match.homeScore === null || match.awayScore === null) return 0;
  if (prediction.predicted_home === match.homeScore && prediction.predicted_away === match.awayScore) {
    return EXACT_SCORE_POINTS;
  }
  if (outcome(prediction.predicted_home, prediction.predicted_away) === outcome(match.homeScore, match.awayScore)) {
    return CORRECT_OUTCOME_POINTS;
  }
  return 0;
}

/**
 * Build a ranked leaderboard from every member, their predictions and the
 * finished matches. Only matches with final scores contribute points.
 */
export function buildLeaderboard(
  profiles: ProfileRow[],
  predictions: Prediction[],
  matches: Match[],
): LeaderboardEntry[] {
  const matchById = new Map(matches.map((m) => [m.id, m]));

  const entries = new Map<string, LeaderboardEntry>();
  for (const p of profiles) {
    entries.set(p.id, {
      userId: p.id,
      name: p.display_name,
      points: 0,
      exact: 0,
      correct: 0,
      predictionsMade: 0,
    });
  }

  for (const pred of predictions) {
    let entry = entries.get(pred.user_id);
    if (!entry) {
      entry = { userId: pred.user_id, name: 'Member', points: 0, exact: 0, correct: 0, predictionsMade: 0 };
      entries.set(pred.user_id, entry);
    }
    entry.predictionsMade += 1;

    const match = matchById.get(pred.match_id);
    if (!match) continue;
    const pts = scorePrediction(pred, match);
    entry.points += pts;
    if (pts === EXACT_SCORE_POINTS) entry.exact += 1;
    else if (pts === CORRECT_OUTCOME_POINTS) entry.correct += 1;
  }

  return Array.from(entries.values()).sort(
    (a, b) => b.points - a.points || b.exact - a.exact || a.name.localeCompare(b.name),
  );
}
