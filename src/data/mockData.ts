export interface Team {
  id: number;
  name: string;
  flag: string;
  group: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

export interface Match {
  id: number;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  homeScore: number | null;
  awayScore: number | null;
  venue: string;
  stage: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

// Official group-stage draw for the 2026 FIFA World Cup (final draw held Dec 5, 2025).
// The tournament has not kicked off yet, so all standings start at zero.
export const groups: Record<string, Team[]> = {
  A: [
    { id: 1, name: 'Mexico', flag: '🇲🇽', group: 'A', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 2, name: 'South Africa', flag: '🇿🇦', group: 'A', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 3, name: 'South Korea', flag: '🇰🇷', group: 'A', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 4, name: 'Czech Republic', flag: '🇨🇿', group: 'A', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  B: [
    { id: 5, name: 'Canada', flag: '🇨🇦', group: 'B', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 6, name: 'Bosnia and Herzegovina', flag: '🇧🇦', group: 'B', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 7, name: 'Qatar', flag: '🇶🇦', group: 'B', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 8, name: 'Switzerland', flag: '🇨🇭', group: 'B', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  C: [
    { id: 9, name: 'Brazil', flag: '🇧🇷', group: 'C', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 10, name: 'Morocco', flag: '🇲🇦', group: 'C', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 11, name: 'Haiti', flag: '🇭🇹', group: 'C', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 12, name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  D: [
    { id: 13, name: 'United States', flag: '🇺🇸', group: 'D', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 14, name: 'Paraguay', flag: '🇵🇾', group: 'D', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 15, name: 'Australia', flag: '🇦🇺', group: 'D', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 16, name: 'Turkey', flag: '🇹🇷', group: 'D', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  E: [
    { id: 17, name: 'Germany', flag: '🇩🇪', group: 'E', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 18, name: 'Curaçao', flag: '🇨🇼', group: 'E', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 19, name: 'Ivory Coast', flag: '🇨🇮', group: 'E', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 20, name: 'Ecuador', flag: '🇪🇨', group: 'E', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  F: [
    { id: 21, name: 'Netherlands', flag: '🇳🇱', group: 'F', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 22, name: 'Japan', flag: '🇯🇵', group: 'F', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 23, name: 'Sweden', flag: '🇸🇪', group: 'F', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 24, name: 'Tunisia', flag: '🇹🇳', group: 'F', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  G: [
    { id: 25, name: 'Belgium', flag: '🇧🇪', group: 'G', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 26, name: 'Egypt', flag: '🇪🇬', group: 'G', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 27, name: 'Iran', flag: '🇮🇷', group: 'G', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 28, name: 'New Zealand', flag: '🇳🇿', group: 'G', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  H: [
    { id: 29, name: 'Spain', flag: '🇪🇸', group: 'H', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 30, name: 'Cape Verde', flag: '🇨🇻', group: 'H', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 31, name: 'Saudi Arabia', flag: '🇸🇦', group: 'H', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 32, name: 'Uruguay', flag: '🇺🇾', group: 'H', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  I: [
    { id: 33, name: 'France', flag: '🇫🇷', group: 'I', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 34, name: 'Senegal', flag: '🇸🇳', group: 'I', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 35, name: 'Iraq', flag: '🇮🇶', group: 'I', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 36, name: 'Norway', flag: '🇳🇴', group: 'I', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  J: [
    { id: 37, name: 'Argentina', flag: '🇦🇷', group: 'J', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 38, name: 'Algeria', flag: '🇩🇿', group: 'J', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 39, name: 'Austria', flag: '🇦🇹', group: 'J', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 40, name: 'Jordan', flag: '🇯🇴', group: 'J', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  K: [
    { id: 41, name: 'Portugal', flag: '🇵🇹', group: 'K', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 42, name: 'DR Congo', flag: '🇨🇩', group: 'K', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 43, name: 'Uzbekistan', flag: '🇺🇿', group: 'K', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 44, name: 'Colombia', flag: '🇨🇴', group: 'K', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
  L: [
    { id: 45, name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 46, name: 'Croatia', flag: '🇭🇷', group: 'L', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 47, name: 'Ghana', flag: '🇬🇭', group: 'L', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { id: 48, name: 'Panama', flag: '🇵🇦', group: 'L', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
  ],
};

// Real matchday-1 fixtures (dates, venues and local kickoff times) of the 2026 World Cup.
export const upcomingMatches: Match[] = [
  {
    id: 1, date: 'Jun 11', time: '13:00', homeTeam: 'Mexico', awayTeam: 'South Africa',
    homeFlag: '🇲🇽', awayFlag: '🇿🇦', homeScore: null, awayScore: null,
    venue: 'Estadio Azteca, Mexico City', stage: 'Group A',
  },
  {
    id: 2, date: 'Jun 11', time: '20:00', homeTeam: 'South Korea', awayTeam: 'Czech Republic',
    homeFlag: '🇰🇷', awayFlag: '🇨🇿', homeScore: null, awayScore: null,
    venue: 'Estadio Akron, Guadalajara', stage: 'Group A',
  },
  {
    id: 3, date: 'Jun 12', time: '15:00', homeTeam: 'Canada', awayTeam: 'Bosnia and Herzegovina',
    homeFlag: '🇨🇦', awayFlag: '🇧🇦', homeScore: null, awayScore: null,
    venue: 'BMO Field, Toronto', stage: 'Group B',
  },
  {
    id: 4, date: 'Jun 12', time: '18:00', homeTeam: 'United States', awayTeam: 'Paraguay',
    homeFlag: '🇺🇸', awayFlag: '🇵🇾', homeScore: null, awayScore: null,
    venue: 'SoFi Stadium, Los Angeles', stage: 'Group D',
  },
  {
    id: 5, date: 'Jun 13', time: '12:00', homeTeam: 'Qatar', awayTeam: 'Switzerland',
    homeFlag: '🇶🇦', awayFlag: '🇨🇭', homeScore: null, awayScore: null,
    venue: "Levi's Stadium, San Francisco Bay Area", stage: 'Group B',
  },
  {
    id: 6, date: 'Jun 13', time: '18:00', homeTeam: 'Brazil', awayTeam: 'Morocco',
    homeFlag: '🇧🇷', awayFlag: '🇲🇦', homeScore: null, awayScore: null,
    venue: 'MetLife Stadium, New York/New Jersey', stage: 'Group C',
  },
  {
    id: 7, date: 'Jun 13', time: '21:00', homeTeam: 'Haiti', awayTeam: 'Scotland',
    homeFlag: '🇭🇹', awayFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', homeScore: null, awayScore: null,
    venue: 'Gillette Stadium, Boston', stage: 'Group C',
  },
  {
    id: 8, date: 'Jun 13', time: '21:00', homeTeam: 'Australia', awayTeam: 'Turkey',
    homeFlag: '🇦🇺', awayFlag: '🇹🇷', homeScore: null, awayScore: null,
    venue: 'BC Place, Vancouver', stage: 'Group D',
  },
  {
    id: 9, date: 'Jun 14', time: '12:00', homeTeam: 'Germany', awayTeam: 'Curaçao',
    homeFlag: '🇩🇪', awayFlag: '🇨🇼', homeScore: null, awayScore: null,
    venue: 'NRG Stadium, Houston', stage: 'Group E',
  },
  {
    id: 10, date: 'Jun 14', time: '15:00', homeTeam: 'Netherlands', awayTeam: 'Japan',
    homeFlag: '🇳🇱', awayFlag: '🇯🇵', homeScore: null, awayScore: null,
    venue: 'AT&T Stadium, Dallas', stage: 'Group F',
  },
  {
    id: 11, date: 'Jun 14', time: '19:00', homeTeam: 'Ivory Coast', awayTeam: 'Ecuador',
    homeFlag: '🇨🇮', awayFlag: '🇪🇨', homeScore: null, awayScore: null,
    venue: 'Lincoln Financial Field, Philadelphia', stage: 'Group E',
  },
  {
    id: 12, date: 'Jun 14', time: '20:00', homeTeam: 'Sweden', awayTeam: 'Tunisia',
    homeFlag: '🇸🇪', awayFlag: '🇹🇳', homeScore: null, awayScore: null,
    venue: 'Estadio BBVA, Monterrey', stage: 'Group F',
  },
];

// The tournament kicks off on June 11, 2026, so there are no completed matches yet.
export const recentResults: Match[] = [];

// Pre-tournament facts (the competition has not started, so there are no live match stats yet).
export const tournamentStats: Stat[] = [
  { label: 'Teams', value: '48', icon: '⚽' },
  { label: 'Groups', value: '12', icon: '🏆' },
  { label: 'Matches', value: '104', icon: '🏟️' },
  { label: 'Host Cities', value: '16', icon: '🏙️' },
  { label: 'Host Nations', value: '3', icon: '🌎' },
  { label: 'Kickoff', value: 'Jun 11', icon: '📅' },
];

export const featuredTeams = [
  { name: 'Argentina', flag: '🇦🇷', ranking: 1, coach: 'Lionel Scaloni', confederation: 'CONMEBOL' },
  { name: 'Spain', flag: '🇪🇸', ranking: 2, coach: 'Luis de la Fuente', confederation: 'UEFA' },
  { name: 'France', flag: '🇫🇷', ranking: 3, coach: 'Didier Deschamps', confederation: 'UEFA' },
  { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ranking: 4, coach: 'Thomas Tuchel', confederation: 'UEFA' },
  { name: 'Brazil', flag: '🇧🇷', ranking: 5, coach: 'Carlo Ancelotti', confederation: 'CONMEBOL' },
  { name: 'Portugal', flag: '🇵🇹', ranking: 6, coach: 'Roberto Martínez', confederation: 'UEFA' },
  { name: 'Netherlands', flag: '🇳🇱', ranking: 7, coach: 'Ronald Koeman', confederation: 'UEFA' },
  { name: 'Belgium', flag: '🇧🇪', ranking: 8, coach: 'Rudi Garcia', confederation: 'UEFA' },
  { name: 'Germany', flag: '🇩🇪', ranking: 9, coach: 'Julian Nagelsmann', confederation: 'UEFA' },
  { name: 'United States', flag: '🇺🇸', ranking: 15, coach: 'Mauricio Pochettino', confederation: 'CONCACAF' },
  { name: 'Mexico', flag: '🇲🇽', ranking: 17, coach: 'Javier Aguirre', confederation: 'CONCACAF' },
  { name: 'Canada', flag: '🇨🇦', ranking: 26, coach: 'Jesse Marsch', confederation: 'CONCACAF' },
];
