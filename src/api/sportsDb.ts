import { Match, Team } from '../data/mockData';

const BASE = 'https://www.thesportsdb.com/api/v1/json/3';
const LEAGUE_ID = '4429'; // FIFA World Cup
const SEASON = '2026';

interface SportsDbEvent {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  strHomeTeamBadge: string;
  strAwayTeamBadge: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime: string;
  strTimeLocal: string;
  strGroup: string;
  strVenue: string;
  strCity: string;
  strStatus: string;
  intRound: string;
  strTimestamp: string;
}


const countryFlags: Record<string, string> = {
  'Argentina': '\u{1F1E6}\u{1F1F7}',
  'Algeria': '\u{1F1E9}\u{1F1FF}',
  'Australia': '\u{1F1E6}\u{1F1FA}',
  'Austria': '\u{1F1E6}\u{1F1F9}',
  'Belgium': '\u{1F1E7}\u{1F1EA}',
  'Bolivia': '\u{1F1E7}\u{1F1F4}',
  'Bosnia-Herzegovina': '\u{1F1E7}\u{1F1E6}',
  'Brazil': '\u{1F1E7}\u{1F1F7}',
  'Canada': '\u{1F1E8}\u{1F1E6}',
  'Cape Verde': '\u{1F1E8}\u{1F1FB}',
  'Chile': '\u{1F1E8}\u{1F1F1}',
  'Colombia': '\u{1F1E8}\u{1F1F4}',
  'Croatia': '\u{1F1ED}\u{1F1F7}',
  'Cura\u00e7ao': '\u{1F1E8}\u{1F1FC}',
  'Czech Republic': '\u{1F1E8}\u{1F1FF}',
  'DR Congo': '\u{1F1E8}\u{1F1E9}',
  'Ecuador': '\u{1F1EA}\u{1F1E8}',
  'Egypt': '\u{1F1EA}\u{1F1EC}',
  'England': '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}',
  'France': '\u{1F1EB}\u{1F1F7}',
  'Germany': '\u{1F1E9}\u{1F1EA}',
  'Ghana': '\u{1F1EC}\u{1F1ED}',
  'Haiti': '\u{1F1ED}\u{1F1F9}',
  'Iran': '\u{1F1EE}\u{1F1F7}',
  'Iraq': '\u{1F1EE}\u{1F1F6}',
  'Ivory Coast': '\u{1F1E8}\u{1F1EE}',
  'Japan': '\u{1F1EF}\u{1F1F5}',
  'Jordan': '\u{1F1EF}\u{1F1F4}',
  'Mexico': '\u{1F1F2}\u{1F1FD}',
  'Morocco': '\u{1F1F2}\u{1F1E6}',
  'Netherlands': '\u{1F1F3}\u{1F1F1}',
  'New Zealand': '\u{1F1F3}\u{1F1FF}',
  'Norway': '\u{1F1F3}\u{1F1F4}',
  'Panama': '\u{1F1F5}\u{1F1E6}',
  'Paraguay': '\u{1F1F5}\u{1F1FE}',
  'Peru': '\u{1F1F5}\u{1F1EA}',
  'Portugal': '\u{1F1F5}\u{1F1F9}',
  'Qatar': '\u{1F1F6}\u{1F1E6}',
  'Saudi Arabia': '\u{1F1F8}\u{1F1E6}',
  'Scotland': '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}',
  'Senegal': '\u{1F1F8}\u{1F1F3}',
  'South Africa': '\u{1F1FF}\u{1F1E6}',
  'South Korea': '\u{1F1F0}\u{1F1F7}',
  'Spain': '\u{1F1EA}\u{1F1F8}',
  'Sweden': '\u{1F1F8}\u{1F1EA}',
  'Switzerland': '\u{1F1E8}\u{1F1ED}',
  'Tunisia': '\u{1F1F9}\u{1F1F3}',
  'Turkey': '\u{1F1F9}\u{1F1F7}',
  'USA': '\u{1F1FA}\u{1F1F8}',
  'United States': '\u{1F1FA}\u{1F1F8}',
  'Uruguay': '\u{1F1FA}\u{1F1FE}',
  'Uzbekistan': '\u{1F1FA}\u{1F1FF}',
};

function getFlag(teamName: string): string {
  return countryFlags[teamName] || '\u{1F3F3}\u{FE0F}';
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function eventToMatch(event: SportsDbEvent, index: number): Match {
  return {
    id: parseInt(event.idEvent) || index,
    date: formatDate(event.dateEvent),
    time: event.strTime?.slice(0, 5) || '',
    homeTeam: event.strHomeTeam,
    awayTeam: event.strAwayTeam,
    homeFlag: getFlag(event.strHomeTeam),
    awayFlag: getFlag(event.strAwayTeam),
    homeScore: event.intHomeScore != null ? parseInt(event.intHomeScore) : null,
    awayScore: event.intAwayScore != null ? parseInt(event.intAwayScore) : null,
    venue: `${event.strVenue}${event.strCity ? ', ' + event.strCity : ''}`,
    stage: event.strGroup ? `Group ${event.strGroup}` : 'TBD',
  };
}

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchUpcomingMatches(): Promise<Match[]> {
  const data = await fetchJson(`${BASE}/eventsnextleague.php?id=${LEAGUE_ID}`);
  const events: SportsDbEvent[] = data.events || [];
  return events.map(eventToMatch);
}

export async function fetchRecentResults(): Promise<Match[]> {
  const data = await fetchJson(`${BASE}/eventspastleague.php?id=${LEAGUE_ID}`);
  const events: SportsDbEvent[] = (data.events || []).filter(
    (e: SportsDbEvent) => e.dateEvent && e.dateEvent.startsWith('2026')
  );
  return events.map(eventToMatch).reverse();
}

export async function fetchAllGroupMatches(): Promise<Match[]> {
  const rounds = [1, 2, 3];
  const allEvents: SportsDbEvent[] = [];

  for (const r of rounds) {
    const data = await fetchJson(`${BASE}/eventsround.php?id=${LEAGUE_ID}&r=${r}&s=${SEASON}`);
    const events: SportsDbEvent[] = data.events || [];
    allEvents.push(...events);
  }

  allEvents.sort((a, b) => {
    const dateA = a.strTimestamp || a.dateEvent;
    const dateB = b.strTimestamp || b.dateEvent;
    return dateA.localeCompare(dateB);
  });

  return allEvents.map(eventToMatch);
}

export async function fetchGroupStandings(): Promise<Record<string, Team[]>> {
  const allMatches = await fetchAllGroupMatches();
  const groups: Record<string, Team[]> = {};

  const teamMap = new Map<string, { group: string; flag: string }>();
  for (const m of allMatches) {
    const groupLetter = m.stage.replace('Group ', '');
    if (!teamMap.has(m.homeTeam)) {
      teamMap.set(m.homeTeam, { group: groupLetter, flag: m.homeFlag });
    }
    if (!teamMap.has(m.awayTeam)) {
      teamMap.set(m.awayTeam, { group: groupLetter, flag: m.awayFlag });
    }
  }

  let idCounter = 1;
  teamMap.forEach((info, name) => {
    if (!groups[info.group]) groups[info.group] = [];
    groups[info.group].push({
      id: idCounter++,
      name,
      flag: info.flag,
      group: info.group,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      points: 0,
    });
  });

  for (const m of allMatches) {
    if (m.homeScore == null || m.awayScore == null) continue;
    const groupLetter = m.stage.replace('Group ', '');
    const groupTeams = groups[groupLetter];
    if (!groupTeams) continue;

    const home = groupTeams.find(t => t.name === m.homeTeam);
    const away = groupTeams.find(t => t.name === m.awayTeam);
    if (!home || !away) continue;

    home.played++;
    away.played++;

    if (m.homeScore > m.awayScore) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (m.homeScore < m.awayScore) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      away.drawn++;
      home.points += 1;
      away.points += 1;
    }
  }

  const sorted: Record<string, Team[]> = {};
  for (const key of Object.keys(groups).sort()) {
    sorted[key] = groups[key].sort((a, b) => b.points - a.points || b.won - a.won);
  }

  return sorted;
}

export interface LiveTeam {
  name: string;
  flag: string;
  group: string;
  badgeUrl: string;
}

export async function fetchTeams(): Promise<LiveTeam[]> {
  const allMatches = await fetchAllGroupMatches();
  const teamMap = new Map<string, LiveTeam>();

  for (const m of allMatches) {
    const groupLetter = m.stage.replace('Group ', '');
    if (!teamMap.has(m.homeTeam)) {
      teamMap.set(m.homeTeam, { name: m.homeTeam, flag: m.homeFlag, group: groupLetter, badgeUrl: '' });
    }
    if (!teamMap.has(m.awayTeam)) {
      teamMap.set(m.awayTeam, { name: m.awayTeam, flag: m.awayFlag, group: groupLetter, badgeUrl: '' });
    }
  }

  const result: LiveTeam[] = [];
  teamMap.forEach((val) => result.push(val));
  return result.sort((a, b) => a.name.localeCompare(b.name));
}
