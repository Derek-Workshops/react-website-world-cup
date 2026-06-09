import { Match } from '../data/mockData';
import { countryFlag } from '../utils/flags';

// TheSportsDB FIFA World Cup league id and current season.
const LEAGUE_ID = '4429';
const SEASON = '2026';

// The free shared key ("3") works for development. Set REACT_APP_SPORTSDB_KEY
// to a premium key to unlock full coverage (all 104 matches, standings, etc.).
const API_KEY = process.env.REACT_APP_SPORTSDB_KEY || '3';
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

interface SportsDbEvent {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime: string | null;
  strTimestamp: string | null;
  intRound: string | null;
  strVenue: string | null;
}

interface EventsResponse {
  events: SportsDbEvent[] | null;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (dateEvent: string): string => {
  const parts = dateEvent.split('-');
  if (parts.length !== 3) return dateEvent;
  const month = MONTHS[Number(parts[1]) - 1] ?? '';
  return `${month} ${Number(parts[2])}`.trim();
};

const formatTime = (time: string | null): string => (time ? time.slice(0, 5) : 'TBD');

const stageLabel = (round: string | null): string =>
  round ? `Matchday ${round}` : 'Group Stage';

const mapEvent = (e: SportsDbEvent): Match => ({
  id: Number(e.idEvent),
  date: formatDate(e.dateEvent),
  time: formatTime(e.strTime),
  homeTeam: e.strHomeTeam,
  awayTeam: e.strAwayTeam,
  homeFlag: countryFlag(e.strHomeTeam),
  awayFlag: countryFlag(e.strAwayTeam),
  homeScore: e.intHomeScore === null ? null : Number(e.intHomeScore),
  awayScore: e.intAwayScore === null ? null : Number(e.intAwayScore),
  venue: e.strVenue || 'Venue TBD',
  stage: stageLabel(e.intRound),
});

const timestampOf = (e: SportsDbEvent): number =>
  new Date(e.strTimestamp || `${e.dateEvent}T${e.strTime || '00:00:00'}`).getTime();

const isPlayed = (e: SportsDbEvent): boolean =>
  e.intHomeScore !== null && e.intAwayScore !== null;

export interface WorldCupMatches {
  upcoming: Match[];
  results: Match[];
}

export const fetchWorldCupMatches = async (): Promise<WorldCupMatches> => {
  const res = await fetch(`${BASE_URL}/eventsseason.php?id=${LEAGUE_ID}&s=${SEASON}`);
  if (!res.ok) {
    throw new Error(`SportsDB request failed: ${res.status}`);
  }
  const data: EventsResponse = await res.json();
  const events = data.events ?? [];

  const upcoming = events
    .filter((e) => !isPlayed(e))
    .sort((a, b) => timestampOf(a) - timestampOf(b))
    .map(mapEvent);

  const results = events
    .filter(isPlayed)
    .sort((a, b) => timestampOf(b) - timestampOf(a))
    .map(mapEvent);

  return { upcoming, results };
};
