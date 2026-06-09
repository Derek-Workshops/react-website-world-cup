export interface Prize {
  rank: number;
  medal: string;
  title: string;
  reward: string;
}

// Edit these to match whatever your team is playing for.
export const prizes: Prize[] = [
  { rank: 1, medal: '🥇', title: 'Champion', reward: '$100 gift card' },
  { rank: 2, medal: '🥈', title: 'Runner-up', reward: '$50 gift card' },
  { rank: 3, medal: '🥉', title: 'Third place', reward: '$25 gift card' },
];

export const scoringRules = [
  { label: 'Exact score', points: 3 },
  { label: 'Correct result (win/draw/loss)', points: 1 },
  { label: 'Wrong', points: 0 },
];
