export interface Team {
  id: number;
  name: string;
  logo: string;
  conference: 'East' | 'West';
  seed: number;
  won: number;
  lost: number;
  pct: string;
  gb: string;
}

export interface Match {
  id: number;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  homeScore: number | null;
  awayScore: number | null;
  venue: string;
  round: string;
  label: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export const standings: Record<'East' | 'West', Team[]> = {
  East: [
    { id: 1, name: 'Boston Celtics', logo: '🍀', conference: 'East', seed: 1, won: 64, lost: 18, pct: '.780', gb: '—' },
    { id: 2, name: 'New York Knicks', logo: '🗽', conference: 'East', seed: 2, won: 56, lost: 26, pct: '.683', gb: '8.0' },
    { id: 3, name: 'Milwaukee Bucks', logo: '🦌', conference: 'East', seed: 3, won: 52, lost: 30, pct: '.634', gb: '12.0' },
    { id: 4, name: 'Cleveland Cavaliers', logo: '⚔️', conference: 'East', seed: 4, won: 50, lost: 32, pct: '.610', gb: '14.0' },
    { id: 5, name: 'Indiana Pacers', logo: '🏎️', conference: 'East', seed: 5, won: 49, lost: 33, pct: '.598', gb: '15.0' },
    { id: 6, name: 'Orlando Magic', logo: '🪄', conference: 'East', seed: 6, won: 47, lost: 35, pct: '.573', gb: '17.0' },
    { id: 7, name: 'Miami Heat', logo: '🔥', conference: 'East', seed: 7, won: 44, lost: 38, pct: '.537', gb: '20.0' },
    { id: 8, name: 'Philadelphia 76ers', logo: '🔔', conference: 'East', seed: 8, won: 42, lost: 40, pct: '.512', gb: '22.0' },
  ],
  West: [
    { id: 9, name: 'Oklahoma City Thunder', logo: '⚡', conference: 'West', seed: 1, won: 66, lost: 16, pct: '.805', gb: '—' },
    { id: 10, name: 'Denver Nuggets', logo: '⛰️', conference: 'West', seed: 2, won: 57, lost: 25, pct: '.695', gb: '9.0' },
    { id: 11, name: 'Minnesota Timberwolves', logo: '🐺', conference: 'West', seed: 3, won: 55, lost: 27, pct: '.671', gb: '11.0' },
    { id: 12, name: 'Los Angeles Lakers', logo: '⭐', conference: 'West', seed: 4, won: 51, lost: 31, pct: '.622', gb: '15.0' },
    { id: 13, name: 'Dallas Mavericks', logo: '🐎', conference: 'West', seed: 5, won: 50, lost: 32, pct: '.610', gb: '16.0' },
    { id: 14, name: 'Golden State Warriors', logo: '🌉', conference: 'West', seed: 6, won: 48, lost: 34, pct: '.585', gb: '18.0' },
    { id: 15, name: 'Phoenix Suns', logo: '☀️', conference: 'West', seed: 7, won: 45, lost: 37, pct: '.549', gb: '21.0' },
    { id: 16, name: 'LA Clippers', logo: '⛵', conference: 'West', seed: 8, won: 44, lost: 38, pct: '.537', gb: '22.0' },
  ],
};

export const upcomingMatches: Match[] = [
  {
    id: 4, date: 'Jun 13', time: '20:30', homeTeam: 'Boston Celtics', awayTeam: 'Oklahoma City Thunder',
    homeLogo: '🍀', awayLogo: '⚡', homeScore: null, awayScore: null,
    venue: 'TD Garden, Boston', round: 'NBA Finals', label: 'Game 4',
  },
  {
    id: 5, date: 'Jun 16', time: '20:00', homeTeam: 'Oklahoma City Thunder', awayTeam: 'Boston Celtics',
    homeLogo: '⚡', awayLogo: '🍀', homeScore: null, awayScore: null,
    venue: 'Paycom Center, Oklahoma City', round: 'NBA Finals', label: 'Game 5',
  },
  {
    id: 6, date: 'Jun 19', time: '20:30', homeTeam: 'Boston Celtics', awayTeam: 'Oklahoma City Thunder',
    homeLogo: '🍀', awayLogo: '⚡', homeScore: null, awayScore: null,
    venue: 'TD Garden, Boston', round: 'NBA Finals', label: 'Game 6',
  },
  {
    id: 7, date: 'Jun 22', time: '20:00', homeTeam: 'Oklahoma City Thunder', awayTeam: 'Boston Celtics',
    homeLogo: '⚡', awayLogo: '🍀', homeScore: null, awayScore: null,
    venue: 'Paycom Center, Oklahoma City', round: 'NBA Finals', label: 'Game 7',
  },
];

export const recentResults: Match[] = [
  {
    id: 3, date: 'Jun 10', time: '20:30', homeTeam: 'Boston Celtics', awayTeam: 'Oklahoma City Thunder',
    homeLogo: '🍀', awayLogo: '⚡', homeScore: 118, awayScore: 109,
    venue: 'TD Garden, Boston', round: 'NBA Finals', label: 'Game 3',
  },
  {
    id: 2, date: 'Jun 7', time: '20:00', homeTeam: 'Oklahoma City Thunder', awayTeam: 'Boston Celtics',
    homeLogo: '⚡', awayLogo: '🍀', homeScore: 105, awayScore: 112,
    venue: 'Paycom Center, Oklahoma City', round: 'NBA Finals', label: 'Game 2',
  },
  {
    id: 1, date: 'Jun 4', time: '20:00', homeTeam: 'Oklahoma City Thunder', awayTeam: 'Boston Celtics',
    homeLogo: '⚡', awayLogo: '🍀', homeScore: 110, awayScore: 102,
    venue: 'Paycom Center, Oklahoma City', round: 'NBA Finals', label: 'Game 1',
  },
  {
    id: 101, date: 'May 29', time: '20:30', homeTeam: 'Oklahoma City Thunder', awayTeam: 'Minnesota Timberwolves',
    homeLogo: '⚡', awayLogo: '🐺', homeScore: 122, awayScore: 116,
    venue: 'Paycom Center, Oklahoma City', round: 'Conf. Finals', label: 'West Finals · G5',
  },
  {
    id: 102, date: 'May 27', time: '20:00', homeTeam: 'Boston Celtics', awayTeam: 'Indiana Pacers',
    homeLogo: '🍀', awayLogo: '🏎️', homeScore: 114, awayScore: 105,
    venue: 'TD Garden, Boston', round: 'Conf. Finals', label: 'East Finals · G6',
  },
];

export const seriesStats: Stat[] = [
  { label: 'Series Lead', value: 'BOS 2–1', icon: '🏆' },
  { label: 'Games Played', value: '3 of 7', icon: '🏀' },
  { label: 'Points/Game', value: '112.4', icon: '📊' },
  { label: 'Lead Scorer', value: 'SGA 30.4', icon: '👟' },
  { label: 'Attendance', value: '18,203', icon: '👥' },
  { label: 'TV Viewers', value: '12.4M', icon: '📺' },
];

export const featuredTeams = [
  { name: 'Oklahoma City Thunder', logo: '⚡', seed: 1, coach: 'Mark Daigneault', conference: 'West', record: '66–16' },
  { name: 'Boston Celtics', logo: '🍀', seed: 1, coach: 'Joe Mazzulla', conference: 'East', record: '64–18' },
  { name: 'Denver Nuggets', logo: '⛰️', seed: 2, coach: 'Michael Malone', conference: 'West', record: '57–25' },
  { name: 'New York Knicks', logo: '🗽', seed: 2, coach: 'Tom Thibodeau', conference: 'East', record: '56–26' },
  { name: 'Minnesota Timberwolves', logo: '🐺', seed: 3, coach: 'Chris Finch', conference: 'West', record: '55–27' },
  { name: 'Milwaukee Bucks', logo: '🦌', seed: 3, coach: 'Doc Rivers', conference: 'East', record: '52–30' },
  { name: 'Los Angeles Lakers', logo: '⭐', seed: 4, coach: 'JJ Redick', conference: 'West', record: '51–31' },
  { name: 'Cleveland Cavaliers', logo: '⚔️', seed: 4, coach: 'Kenny Atkinson', conference: 'East', record: '50–32' },
  { name: 'Dallas Mavericks', logo: '🐎', seed: 5, coach: 'Jason Kidd', conference: 'West', record: '50–32' },
  { name: 'Indiana Pacers', logo: '🏎️', seed: 5, coach: 'Rick Carlisle', conference: 'East', record: '49–33' },
  { name: 'Golden State Warriors', logo: '🌉', seed: 6, coach: 'Steve Kerr', conference: 'West', record: '48–34' },
  { name: 'Orlando Magic', logo: '🪄', seed: 6, coach: 'Jamahl Mosley', conference: 'East', record: '47–35' },
  { name: 'Phoenix Suns', logo: '☀️', seed: 7, coach: 'Mike Budenholzer', conference: 'West', record: '45–37' },
  { name: 'Miami Heat', logo: '🔥', seed: 7, coach: 'Erik Spoelstra', conference: 'East', record: '44–38' },
  { name: 'LA Clippers', logo: '⛵', seed: 8, coach: 'Tyronn Lue', conference: 'West', record: '44–38' },
  { name: 'Philadelphia 76ers', logo: '🔔', seed: 8, coach: 'Nick Nurse', conference: 'East', record: '42–40' },
];
