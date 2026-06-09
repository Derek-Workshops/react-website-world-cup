import { Match } from '../data/mockData';

// TheSportsDB free/test API (key "3"). No sign-up required.
// FIFA World Cup is league id 4429; we request the 2026 season.
const API_BASE = 'https://www.thesportsdb.com/api/v1/json/3';
const WORLD_CUP_LEAGUE_ID = '4429';
const SEASON = '2026';

interface ApiEvent {
  idEvent: string;
  dateEvent: string | null;
  strTime: string | null;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strVenue: string | null;
  strCity: string | null;
  intRound: string | null;
  strHomeTeamBadge: string | null;
  strAwayTeamBadge: string | null;
}

interface EventsResponse {
  events: ApiEvent[] | null;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateEvent: string | null): string {
  if (!dateEvent) return 'TBD';
  const [, month, day] = dateEvent.split('-');
  const m = MONTHS[Number(month) - 1] ?? '';
  return `${m} ${Number(day)}`;
}

function formatStage(round: string | null): string {
  if (!round) return 'Group Stage';
  return `Matchday ${round}`;
}

function mapEvent(e: ApiEvent): Match {
  const home = e.intHomeScore != null ? Number(e.intHomeScore) : null;
  const away = e.intAwayScore != null ? Number(e.intAwayScore) : null;
  return {
    id: Number(e.idEvent),
    date: formatDate(e.dateEvent),
    time: e.strTime ? e.strTime.slice(0, 5) : 'TBD',
    homeTeam: e.strHomeTeam,
    awayTeam: e.strAwayTeam,
    homeFlag: '⚽',
    awayFlag: '⚽',
    homeScore: home,
    awayScore: away,
    venue: [e.strVenue, e.strCity].filter(Boolean).join(', ') || 'Venue TBD',
    stage: formatStage(e.intRound),
    homeBadge: e.strHomeTeamBadge ?? undefined,
    awayBadge: e.strAwayTeamBadge ?? undefined,
  };
}

/**
 * Fetch the 2026 FIFA World Cup fixtures from TheSportsDB and split them into
 * upcoming matches (no score yet) and completed results.
 */
export async function fetchWorldCupMatches(): Promise<{ upcoming: Match[]; results: Match[] }> {
  const res = await fetch(`${API_BASE}/eventsseason.php?id=${WORLD_CUP_LEAGUE_ID}&s=${SEASON}`);
  if (!res.ok) {
    throw new Error(`Live data request failed (${res.status})`);
  }

  const data: EventsResponse = await res.json();
  const events = data.events ?? [];

  const matches = events
    .map(mapEvent)
    .sort((a, b) => a.id - b.id);

  const upcoming = matches.filter((m) => m.homeScore === null || m.awayScore === null);
  const results = matches.filter((m) => m.homeScore !== null && m.awayScore !== null);

  return { upcoming, results };
}
