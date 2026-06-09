// Live FIFA World Cup 2026 data from TheSportsDB.
// Uses the free, public test key ("3"). No auth required; CORS is open.
// League 4429 = FIFA World Cup, season "2026".
// The group stage is rounds 1-3 (24 matches each = 72 fixtures, 48 teams, 12 groups).

const BASE = 'https://www.thesportsdb.com/api/v1/json/3';
const WORLD_CUP_LEAGUE_ID = '4429';
const SEASON = '2026';
const GROUP_STAGE_ROUNDS = [1, 2, 3];

export interface Fixture {
  id: string;
  timestamp: string | null;
  date: string; // e.g. "Jun 11"
  time: string; // e.g. "19:00"
  group: string;
  homeTeam: string;
  awayTeam: string;
  homeBadge: string | null;
  awayBadge: string | null;
  homeScore: number | null;
  awayScore: number | null;
  venue: string;
  finished: boolean;
}

export interface TeamInfo {
  name: string;
  badge: string | null;
  group: string;
}

export interface Standing {
  team: string;
  badge: string | null;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

interface ApiEvent {
  idEvent: string;
  strGroup: string | null;
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
    group: e.strGroup ?? '',
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

async function fetchRound(round: number): Promise<ApiEvent[]> {
  const res = await fetch(`${BASE}/eventsround.php?id=${WORLD_CUP_LEAGUE_ID}&r=${round}&s=${SEASON}`);
  if (!res.ok) throw new Error(`Failed to load round ${round} (${res.status})`);
  const data: { events: ApiEvent[] | null } = await res.json();
  return data.events ?? [];
}

let cache: Promise<Fixture[]> | null = null;

export function fetchFixtures(): Promise<Fixture[]> {
  if (!cache) {
    cache = Promise.all(GROUP_STAGE_ROUNDS.map(fetchRound))
      .then((rounds) => {
        const byId = new Map<string, Fixture>();
        rounds.flat().forEach((e) => byId.set(e.idEvent, mapEvent(e)));
        return Array.from(byId.values()).sort(byTimestampAsc);
      })
      .catch((err) => {
        cache = null; // allow retry on next call
        throw err;
      });
  }
  return cache;
}

export const getUpcoming = (fixtures: Fixture[]): Fixture[] =>
  fixtures.filter((f) => !f.finished);

export const getResults = (fixtures: Fixture[]): Fixture[] =>
  fixtures.filter((f) => f.finished).reverse();

export const getGroupNames = (fixtures: Fixture[]): string[] =>
  Array.from(new Set(fixtures.map((f) => f.group).filter(Boolean))).sort();

export function getTeams(fixtures: Fixture[]): TeamInfo[] {
  const byName = new Map<string, TeamInfo>();
  fixtures.forEach((f) => {
    if (!byName.has(f.homeTeam)) byName.set(f.homeTeam, { name: f.homeTeam, badge: f.homeBadge, group: f.group });
    if (!byName.has(f.awayTeam)) byName.set(f.awayTeam, { name: f.awayTeam, badge: f.awayBadge, group: f.group });
  });
  return Array.from(byName.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// Computes group standings from finished fixtures. Pre-tournament every team has 0 played.
export function buildStandings(fixtures: Fixture[]): Record<string, Standing[]> {
  const groups: Record<string, Map<string, Standing>> = {};

  const ensure = (group: string, team: string, badge: string | null): Standing => {
    if (!groups[group]) groups[group] = new Map();
    const map = groups[group];
    if (!map.has(team)) {
      map.set(team, {
        team,
        badge,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0,
      });
    }
    return map.get(team)!;
  };

  fixtures.forEach((f) => {
    if (!f.group) return;
    const home = ensure(f.group, f.homeTeam, f.homeBadge);
    const away = ensure(f.group, f.awayTeam, f.awayBadge);
    if (!f.finished || f.homeScore === null || f.awayScore === null) return;

    home.played += 1;
    away.played += 1;
    home.goalsFor += f.homeScore;
    home.goalsAgainst += f.awayScore;
    away.goalsFor += f.awayScore;
    away.goalsAgainst += f.homeScore;

    if (f.homeScore > f.awayScore) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (f.homeScore < f.awayScore) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  });

  const result: Record<string, Standing[]> = {};
  Object.keys(groups)
    .sort()
    .forEach((group) => {
      result[group] = Array.from(groups[group].values())
        .map((s) => ({ ...s, goalDiff: s.goalsFor - s.goalsAgainst }))
        .sort(
          (a, b) =>
            b.points - a.points ||
            b.goalDiff - a.goalDiff ||
            b.goalsFor - a.goalsFor ||
            a.team.localeCompare(b.team),
        );
    });
  return result;
}
