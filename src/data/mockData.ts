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

export interface Venue {
  id: number;
  city: string;
  stadium: string;
  country: 'USA' | 'Canada' | 'Mexico';
  flag: string;
  capacity: number;
  lat: number;
  lng: number;
}

export const venues: Venue[] = [
  { id: 1, city: 'New York / New Jersey', stadium: 'MetLife Stadium', country: 'USA', flag: '🇺🇸', capacity: 82500, lat: 40.8135, lng: -74.0745 },
  { id: 2, city: 'Los Angeles', stadium: 'SoFi Stadium', country: 'USA', flag: '🇺🇸', capacity: 70240, lat: 33.9535, lng: -118.3392 },
  { id: 3, city: 'Dallas', stadium: 'AT&T Stadium', country: 'USA', flag: '🇺🇸', capacity: 80000, lat: 32.7473, lng: -97.0945 },
  { id: 4, city: 'San Francisco Bay Area', stadium: "Levi's Stadium", country: 'USA', flag: '🇺🇸', capacity: 68500, lat: 37.4030, lng: -121.9698 },
  { id: 5, city: 'Miami', stadium: 'Hard Rock Stadium', country: 'USA', flag: '🇺🇸', capacity: 65326, lat: 25.9580, lng: -80.2389 },
  { id: 6, city: 'Atlanta', stadium: 'Mercedes-Benz Stadium', country: 'USA', flag: '🇺🇸', capacity: 71000, lat: 33.7553, lng: -84.4006 },
  { id: 7, city: 'Seattle', stadium: 'Lumen Field', country: 'USA', flag: '🇺🇸', capacity: 69000, lat: 47.5952, lng: -122.3316 },
  { id: 8, city: 'Houston', stadium: 'NRG Stadium', country: 'USA', flag: '🇺🇸', capacity: 72220, lat: 29.6847, lng: -95.4107 },
  { id: 9, city: 'Kansas City', stadium: 'Arrowhead Stadium', country: 'USA', flag: '🇺🇸', capacity: 76416, lat: 39.0489, lng: -94.4839 },
  { id: 10, city: 'Boston', stadium: 'Gillette Stadium', country: 'USA', flag: '🇺🇸', capacity: 65878, lat: 42.0909, lng: -71.2643 },
  { id: 11, city: 'Philadelphia', stadium: 'Lincoln Financial Field', country: 'USA', flag: '🇺🇸', capacity: 69596, lat: 39.9008, lng: -75.1675 },
  { id: 12, city: 'Toronto', stadium: 'BMO Field', country: 'Canada', flag: '🇨🇦', capacity: 45736, lat: 43.6332, lng: -79.4185 },
  { id: 13, city: 'Vancouver', stadium: 'BC Place', country: 'Canada', flag: '🇨🇦', capacity: 54500, lat: 49.2768, lng: -123.1119 },
  { id: 14, city: 'Mexico City', stadium: 'Estadio Azteca', country: 'Mexico', flag: '🇲🇽', capacity: 87523, lat: 19.3029, lng: -99.1505 },
  { id: 15, city: 'Guadalajara', stadium: 'Estadio Akron', country: 'Mexico', flag: '🇲🇽', capacity: 49850, lat: 20.6819, lng: -103.4625 },
  { id: 16, city: 'Monterrey', stadium: 'Estadio BBVA', country: 'Mexico', flag: '🇲🇽', capacity: 53500, lat: 25.6692, lng: -100.2444 },
];
