import { Match } from '../data/mockData';
import { countryFlag } from '../utils/flags';

// ESPN's public sports API is free, needs no API key, and sends permissive CORS
// headers, so it can be called directly from this backend-less app.
const BASE_URL =
  'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';
// 2026 FIFA World Cup window (group stage through final).
const DATE_RANGE = '20260611-20260719';

interface EspnTeam {
  displayName: string;
}

interface EspnCompetitor {
  homeAway: 'home' | 'away';
  team: EspnTeam;
  score: string | null;
}

interface EspnCompetition {
  venue?: { fullName?: string };
  competitors: EspnCompetitor[];
}

interface EspnEvent {
  id: string;
  date: string;
  season?: { slug?: string };
  venue?: { fullName?: string };
  status: { type: { completed: boolean } };
  competitions: EspnCompetition[];
}

interface ScoreboardResponse {
  events: EspnEvent[] | null;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
};

const formatTime = (iso: string): string =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

// "group-stage" -> "Group Stage", "round-of-16" -> "Round Of 16".
const stageLabel = (slug: string | undefined): string => {
  if (!slug) return 'Group Stage';
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

const findTeam = (competitors: EspnCompetitor[], side: 'home' | 'away') =>
  competitors.find((c) => c.homeAway === side) ?? competitors[0];

const mapEvent = (e: EspnEvent): Match => {
  const comp = e.competitions[0];
  const completed = e.status.type.completed;
  const home = findTeam(comp.competitors, 'home');
  const away = findTeam(comp.competitors, 'away');
  const homeName = home.team.displayName;
  const awayName = away.team.displayName;

  return {
    id: Number(e.id),
    date: formatDate(e.date),
    time: formatTime(e.date),
    homeTeam: homeName,
    awayTeam: awayName,
    homeFlag: countryFlag(homeName),
    awayFlag: countryFlag(awayName),
    homeScore: completed && home.score != null ? Number(home.score) : null,
    awayScore: completed && away.score != null ? Number(away.score) : null,
    venue: e.venue?.fullName || comp.venue?.fullName || stageLabel(e.season?.slug),
    stage: stageLabel(e.season?.slug),
  };
};

export interface WorldCupMatches {
  upcoming: Match[];
  results: Match[];
}

export const fetchWorldCupMatches = async (): Promise<WorldCupMatches> => {
  const res = await fetch(`${BASE_URL}?dates=${DATE_RANGE}`);
  if (!res.ok) {
    throw new Error(`ESPN request failed: ${res.status}`);
  }
  const data: ScoreboardResponse = await res.json();
  const events = data.events ?? [];

  const upcoming = events
    .filter((e) => !e.status.type.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(mapEvent);

  const results = events
    .filter((e) => e.status.type.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(mapEvent);

  return { upcoming, results };
};
