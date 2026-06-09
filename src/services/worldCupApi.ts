// Live FIFA World Cup 2026 data from TheSportsDB.
// Uses the free, public test key ("3"). No auth required; CORS is open.
// League 4429 = FIFA World Cup, season "2026".

const BASE = 'https://www.thesportsdb.com/api/v1/json/3';
const WORLD_CUP_LEAGUE_ID = '4429';
const SEASON = '2026';

export interface Fixture {
  id: string;
  timestamp: string | null;
  date: string; // e.g. "Jun 11"
  time: string; // e.g. "19:00"
  homeTeam: string;
  awayTeam: string;
  homeBadge: string | null;
  awayBadge: string | null;
  homeScore: number | null;
  awayScore: number | null;
  venue: string;
  finished: boolean;
}

interface ApiEvent {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  strHomeTeamBadge: string | null;
  strAwayTeamBadge: string | null;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strVenue: string | null;
  strTimestamp: string | null;
  dateEvent: string | null;
  strTime: string | null;
  strStatus: string | null;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (dateEvent: string | null): string => {
  if (!dateEvent) return 'TBD';
  const [, month, day] = dateEvent.split('-');
  const m = MONTHS[Number(month) - 1];
  return m ? `${m} ${Number(day)}` : dateEvent;
};

const toScore = (value: string | null): number | null => {
  if (value === null || value === '') return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
};

const mapEvent = (e: ApiEvent): Fixture => {
  const homeScore = toScore(e.intHomeScore);
  const awayScore = toScore(e.intAwayScore);
  return {
    id: e.idEvent,
    timestamp: e.strTimestamp ?? null,
    date: formatDate(e.dateEvent),
    time: (e.strTime ?? '').slice(0, 5),
    homeTeam: e.strHomeTeam,
    awayTeam: e.strAwayTeam,
    homeBadge: e.strHomeTeamBadge,
    awayBadge: e.strAwayTeamBadge,
    homeScore,
    awayScore,
    venue: e.strVenue ?? 'Venue TBD',
    finished: homeScore !== null && awayScore !== null,
  };
};

const byTimestampAsc = (a: Fixture, b: Fixture): number =>
  (a.timestamp ?? '').localeCompare(b.timestamp ?? '');

export async function fetchFixtures(): Promise<Fixture[]> {
  const res = await fetch(`${BASE}/eventsseason.php?id=${WORLD_CUP_LEAGUE_ID}&s=${SEASON}`);
  if (!res.ok) {
    throw new Error(`Failed to load World Cup data (${res.status})`);
  }
  const data: { events: ApiEvent[] | null } = await res.json();
  const events = data.events ?? [];
  return events.map(mapEvent).sort(byTimestampAsc);
}

export const getUpcoming = (fixtures: Fixture[]): Fixture[] =>
  fixtures.filter((f) => !f.finished);

export const getResults = (fixtures: Fixture[]): Fixture[] =>
  fixtures.filter((f) => f.finished).reverse();
