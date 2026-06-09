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

export const groups: Record<string, Team[]> = {
  A: [
    { id: 1, name: 'United States', flag: '🇺🇸', group: 'A', played: 2, won: 1, drawn: 1, lost: 0, points: 4 },
    { id: 2, name: 'Mexico', flag: '🇲🇽', group: 'A', played: 2, won: 1, drawn: 0, lost: 1, points: 3 },
    { id: 3, name: 'Panama', flag: '🇵🇦', group: 'A', played: 2, won: 0, drawn: 1, lost: 1, points: 1 },
    { id: 4, name: 'Bolivia', flag: '🇧🇴', group: 'A', played: 2, won: 0, drawn: 0, lost: 2, points: 0 },
  ],
  B: [
    { id: 5, name: 'Argentina', flag: '🇦🇷', group: 'B', played: 2, won: 2, drawn: 0, lost: 0, points: 6 },
    { id: 6, name: 'Chile', flag: '🇨🇱', group: 'B', played: 2, won: 1, drawn: 0, lost: 1, points: 3 },
    { id: 7, name: 'Peru', flag: '🇵🇪', group: 'B', played: 2, won: 1, drawn: 0, lost: 1, points: 3 },
    { id: 8, name: 'Canada', flag: '🇨🇦', group: 'B', played: 2, won: 0, drawn: 0, lost: 2, points: 0 },
  ],
  C: [
    { id: 9, name: 'Brazil', flag: '🇧🇷', group: 'C', played: 2, won: 2, drawn: 0, lost: 0, points: 6 },
    { id: 10, name: 'Colombia', flag: '🇨🇴', group: 'C', played: 2, won: 1, drawn: 1, lost: 0, points: 4 },
    { id: 11, name: 'Germany', flag: '🇩🇪', group: 'C', played: 2, won: 0, drawn: 1, lost: 1, points: 1 },
    { id: 12, name: 'Japan', flag: '🇯🇵', group: 'C', played: 2, won: 0, drawn: 0, lost: 2, points: 0 },
  ],
  D: [
    { id: 13, name: 'France', flag: '🇫🇷', group: 'D', played: 2, won: 1, drawn: 1, lost: 0, points: 4 },
    { id: 14, name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'D', played: 2, won: 1, drawn: 1, lost: 0, points: 4 },
    { id: 15, name: 'Spain', flag: '🇪🇸', group: 'D', played: 2, won: 1, drawn: 0, lost: 1, points: 3 },
    { id: 16, name: 'South Korea', flag: '🇰🇷', group: 'D', played: 2, won: 0, drawn: 0, lost: 2, points: 0 },
  ],
};

export const upcomingMatches: Match[] = [
  {
    id: 1, date: 'Jun 14', time: '18:00', homeTeam: 'United States', awayTeam: 'Mexico',
    homeFlag: '🇺🇸', awayFlag: '🇲🇽', homeScore: null, awayScore: null,
    venue: 'MetLife Stadium, New York', stage: 'Group A',
  },
  {
    id: 2, date: 'Jun 15', time: '21:00', homeTeam: 'Argentina', awayTeam: 'Chile',
    homeFlag: '🇦🇷', awayFlag: '🇨🇱', homeScore: null, awayScore: null,
    venue: 'AT&T Stadium, Dallas', stage: 'Group B',
  },
  {
    id: 3, date: 'Jun 16', time: '15:00', homeTeam: 'Brazil', awayTeam: 'Germany',
    homeFlag: '🇧🇷', awayFlag: '🇩🇪', homeScore: null, awayScore: null,
    venue: 'SoFi Stadium, Los Angeles', stage: 'Group C',
  },
  {
    id: 4, date: 'Jun 17', time: '20:00', homeTeam: 'France', awayTeam: 'Spain',
    homeFlag: '🇫🇷', awayFlag: '🇪🇸', homeScore: null, awayScore: null,
    venue: 'Hard Rock Stadium, Miami', stage: 'Group D',
  },
  {
    id: 5, date: 'Jun 18', time: '17:00', homeTeam: 'England', awayTeam: 'Japan',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇯🇵', homeScore: null, awayScore: null,
    venue: 'Lumen Field, Seattle', stage: 'Group D',
  },
  {
    id: 6, date: 'Jun 19', time: '19:00', homeTeam: 'Colombia', awayTeam: 'Peru',
    homeFlag: '🇨🇴', awayFlag: '🇵🇪', homeScore: null, awayScore: null,
    venue: 'Estadio Azteca, Mexico City', stage: 'Group C',
  },
];

export const recentResults: Match[] = [
  {
    id: 101, date: 'Jun 10', time: '20:00', homeTeam: 'United States', awayTeam: 'Bolivia',
    homeFlag: '🇺🇸', awayFlag: '🇧🇴', homeScore: 3, awayScore: 0,
    venue: 'MetLife Stadium, New York', stage: 'Group A',
  },
  {
    id: 102, date: 'Jun 11', time: '18:00', homeTeam: 'Argentina', awayTeam: 'Canada',
    homeFlag: '🇦🇷', awayFlag: '🇨🇦', homeScore: 2, awayScore: 0,
    venue: 'AT&T Stadium, Dallas', stage: 'Group B',
  },
  {
    id: 103, date: 'Jun 12', time: '21:00', homeTeam: 'Brazil', awayTeam: 'Colombia',
    homeFlag: '🇧🇷', awayFlag: '🇨🇴', homeScore: 1, awayScore: 1,
    venue: 'SoFi Stadium, Los Angeles', stage: 'Group C',
  },
];

export const tournamentStats: Stat[] = [
  { label: 'Total Goals', value: '24', icon: '⚽' },
  { label: 'Matches Played', value: '8', icon: '🏟️' },
  { label: 'Yellow Cards', value: '19', icon: '🟨' },
  { label: 'Top Scorer', value: 'L. Messi (3)', icon: '👟' },
  { label: 'Attendance', value: '640,000+', icon: '👥' },
  { label: 'Host Countries', value: '3', icon: '🌎' },
];

export const featuredTeams = [
  { name: 'Argentina', flag: '🇦🇷', ranking: 1, coach: 'Lionel Scaloni', confederation: 'CONMEBOL' },
  { name: 'France', flag: '🇫🇷', ranking: 2, coach: 'Didier Deschamps', confederation: 'UEFA' },
  { name: 'Brazil', flag: '🇧🇷', ranking: 3, coach: 'Dorival Júnior', confederation: 'CONMEBOL' },
  { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ranking: 4, coach: 'Gareth Southgate', confederation: 'UEFA' },
  { name: 'Spain', flag: '🇪🇸', ranking: 5, coach: 'Luis de la Fuente', confederation: 'UEFA' },
  { name: 'United States', flag: '🇺🇸', ranking: 11, coach: 'Mauricio Pochettino', confederation: 'CONCACAF' },
  { name: 'Germany', flag: '🇩🇪', ranking: 12, coach: 'Julian Nagelsmann', confederation: 'UEFA' },
  { name: 'Mexico', flag: '🇲🇽', ranking: 16, coach: 'Javier Aguirre', confederation: 'CONCACAF' },
];

export interface RoadStep {
  stage: string;
  date: string;
  time: string;
  opponent: string;
  opponentFlag: string;
  opponentNote: string;
  stadium: string;
  city: string;
  country: string;
  flag: string;
}

// Brazil's projected knockout path, assuming they win Group C and keep winning.
// Opponents are projections based on the mock group standings and depend on other results.
export const brazilRoadToFinal: RoadStep[] = [
  {
    stage: 'Round of 16',
    date: 'Jul 1, 2026',
    time: '15:00',
    opponent: 'England',
    opponentFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    opponentNote: 'Projected runner-up, Group D',
    stadium: 'Lumen Field',
    city: 'Seattle',
    country: 'USA',
    flag: '🇺🇸',
  },
  {
    stage: 'Quarter-final',
    date: 'Jul 10, 2026',
    time: '18:00',
    opponent: 'United States',
    opponentFlag: '🇺🇸',
    opponentNote: 'Projected winner, Group A',
    stadium: 'SoFi Stadium',
    city: 'Los Angeles',
    country: 'USA',
    flag: '🇺🇸',
  },
  {
    stage: 'Semi-final',
    date: 'Jul 14, 2026',
    time: '20:00',
    opponent: 'Argentina',
    opponentFlag: '🇦🇷',
    opponentNote: 'Projected winner, Group B',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    country: 'USA',
    flag: '🇺🇸',
  },
  {
    stage: 'Final',
    date: 'Jul 19, 2026',
    time: '15:00',
    opponent: 'France',
    opponentFlag: '🇫🇷',
    opponentNote: 'Projected winner, Group D',
    stadium: 'MetLife Stadium',
    city: 'New York / New Jersey',
    country: 'USA',
    flag: '🇺🇸',
  },
];
