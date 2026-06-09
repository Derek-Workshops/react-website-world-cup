export interface Episode {
  id: number;
  number: number;
  title: string;
  description: string;
  date: string;
  duration: string;
  guest: string;
  guestEmoji: string;
  tags: string[];
  audioUrl: string;
  // Optional attribution shown under the episode (e.g. for licensed audio).
  credit?: string;
}

export interface Host {
  name: string;
  role: string;
  emoji: string;
  bio: string;
  funFact: string;
}

export interface Platform {
  name: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

// Real tennis interviews from "The Tennis Podcast" by Kevin G. McClure (2005),
// all licensed CC BY-ND 2.5. Files are bundled unmodified in public/audio.
const audio = (file: string): string => process.env.PUBLIC_URL + '/audio/' + file;
const ttpCredit = (edition: string): string =>
  `Audio: "The Tennis Podcast - ${edition}" by Kevin G. McClure, CC BY-ND 2.5.`;

export const showName = 'Break Point';
export const showTagline = 'A weekly tennis podcast';

export const episodes: Episode[] = [
  {
    id: 7,
    number: 43,
    title: 'Inside the Game with Jim Courier',
    description:
      'A real interview with former World No. 1 and four-time Grand Slam champion Jim Courier on life on tour and the modern game.',
    date: 'Jun 13, 2026',
    duration: '3 min',
    guest: 'Jim Courier',
    guestEmoji: '🏅',
    tags: ['Interview', 'Legends'],
    audioUrl: audio('jim-courier-interview.mp3'),
    credit: ttpCredit('Edition 6'),
  },
  {
    id: 1,
    number: 42,
    title: 'A Conversation with Corey Clarke',
    description:
      'From the Break Point archive: an early interview covering the tennis world, the tour, and the stories behind the sport.',
    date: 'Jun 6, 2026',
    duration: '24 min',
    guest: 'Corey Clarke',
    guestEmoji: '🎾',
    tags: ['Interview', 'History'],
    audioUrl: audio('corey-clarke-interview.mp3'),
    credit: ttpCredit('Edition 2'),
  },
  {
    id: 2,
    number: 41,
    title: 'Coaching the Game with Michele Krause',
    description:
      'An interview on developing players, coaching, and growing the sport at every level.',
    date: 'May 30, 2026',
    duration: '16 min',
    guest: 'Michele Krause',
    guestEmoji: '🧑‍🏫',
    tags: ['Interview', 'Coaching'],
    audioUrl: audio('michele-krause-interview.mp3'),
    credit: ttpCredit('Edition 3'),
  },
  {
    id: 3,
    number: 40,
    title: 'Talking Tennis with Jeff Williams',
    description:
      'A wide-ranging conversation from the Break Point archive on the game and the people who make it.',
    date: 'May 23, 2026',
    duration: '13 min',
    guest: 'Jeff Williams',
    guestEmoji: '🎙️',
    tags: ['Interview', 'History'],
    audioUrl: audio('jeff-williams-interview.mp3'),
    credit: ttpCredit('Edition 5'),
  },
  {
    id: 4,
    number: 39,
    title: 'Training the Pros with Pat Etcheberry',
    description:
      'The renowned fitness trainer behind many tour champions talks conditioning, speed, and what it takes to compete.',
    date: 'May 16, 2026',
    duration: '22 min',
    guest: 'Pat Etcheberry',
    guestEmoji: '💪',
    tags: ['Interview', 'Fitness'],
    audioUrl: audio('pat-etcheberry-interview.mp3'),
    credit: ttpCredit('Edition 9'),
  },
  {
    id: 5,
    number: 38,
    title: 'The Business of Tennis with Jim Baugh',
    description:
      'A tennis-industry leader on growing participation and the future of the sport.',
    date: 'May 9, 2026',
    duration: '10 min',
    guest: 'Jim Baugh',
    guestEmoji: '🏢',
    tags: ['Interview', 'Industry'],
    audioUrl: audio('jim-baugh-interview.mp3'),
    credit: ttpCredit('Edition 4'),
  },
  {
    id: 6,
    number: 37,
    title: 'Life in the Game with Ilana Kloss',
    description:
      'The former World No. 1 doubles player and World TeamTennis leader on her career and life in tennis.',
    date: 'May 2, 2026',
    duration: '16 min',
    guest: 'Ilana Kloss',
    guestEmoji: '🌟',
    tags: ['Interview', 'Legends'],
    audioUrl: audio('ilana-kloss-interview.mp3'),
    credit: ttpCredit('Edition 8'),
  },
];

export const hosts: Host[] = [
  {
    name: 'Jordan Reyes',
    role: 'Host & Founder',
    emoji: '🎙️',
    bio: 'Lifelong tennis obsessive and former college player who started Break Point from a spare bedroom.',
    funFact: 'Once hit with a top-100 pro at a charity event (and lost 6-0).',
  },
  {
    name: 'Priya Sharma',
    role: 'Co-Host & Analyst',
    emoji: '📊',
    bio: 'Turns match stats into stories. If there is a pattern in the data, Priya has already found it.',
    funFact: 'Tracks every Grand Slam final on a giant spreadsheet.',
  },
  {
    name: 'Marcus Bell',
    role: 'Co-Host & Producer',
    emoji: '🎧',
    bio: 'The voice that keeps the show on the rails and the laughs coming between the serious analysis.',
    funFact: 'Owns 14 racquets and refuses to explain why.',
  },
];

export const platforms: Platform[] = [
  { name: 'Apple Podcasts', icon: '🎧' },
  { name: 'Spotify', icon: '🟢' },
  { name: 'YouTube', icon: '▶️' },
  { name: 'Overcast', icon: '📻' },
  { name: 'RSS Feed', icon: '📡' },
];

export const showStats: Stat[] = [
  { label: 'Episodes', value: '42', icon: '🎙️' },
  { label: 'Monthly Listens', value: '85K+', icon: '🎧' },
  { label: 'Avg. Length', value: '52 min', icon: '⏱️' },
  { label: 'Seasons', value: '3', icon: '📚' },
  { label: 'Guests', value: '60+', icon: '⭐' },
  { label: 'New Episodes', value: 'Weekly', icon: '🗓️' },
];
