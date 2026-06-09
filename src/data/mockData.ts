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

// Royalty-free sample audio so the player actually works in the demo.
const SAMPLE_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export const showName = 'Break Point';
export const showTagline = 'A weekly tennis podcast';

export const episodes: Episode[] = [
  {
    id: 1,
    number: 42,
    title: 'The Art of the Second Serve',
    description:
      'We break down why the second serve wins (and loses) the biggest matches, and how the pros build pressure point by point.',
    date: 'Jun 6, 2026',
    duration: '52 min',
    guest: 'Coach Maria Alvarez',
    guestEmoji: '🎾',
    tags: ['Technique', 'Strategy'],
    audioUrl: SAMPLE_AUDIO,
  },
  {
    id: 2,
    number: 41,
    title: 'Clay vs. Grass: A Surface Showdown',
    description:
      'Sliding on clay or charging the net on grass? We argue about which surface makes the most exciting tennis.',
    date: 'May 30, 2026',
    duration: '47 min',
    guest: 'Former Pro Daniel Okafor',
    guestEmoji: '🟧',
    tags: ['Debate', 'History'],
    audioUrl: SAMPLE_AUDIO,
  },
  {
    id: 3,
    number: 40,
    title: 'Inside the Mind of a Returner',
    description:
      'A sports psychologist joins us to talk nerves, routines, and the mental game of facing a 130 mph serve.',
    date: 'May 23, 2026',
    duration: '58 min',
    guest: 'Dr. Lena Park',
    guestEmoji: '🧠',
    tags: ['Mindset', 'Interview'],
    audioUrl: SAMPLE_AUDIO,
  },
  {
    id: 4,
    number: 39,
    title: 'Grand Slam Preview Spectacular',
    description:
      'Our bold predictions, dark horses, and the storylines we cannot wait to follow at the next major.',
    date: 'May 16, 2026',
    duration: '63 min',
    guest: 'The whole crew',
    guestEmoji: '🏆',
    tags: ['Preview', 'Predictions'],
    audioUrl: SAMPLE_AUDIO,
  },
  {
    id: 5,
    number: 38,
    title: 'The One-Handed Backhand Lives On',
    description:
      'It is rare, it is beautiful, and it is endangered. We celebrate the most elegant shot in the game.',
    date: 'May 9, 2026',
    duration: '44 min',
    guest: 'Analyst Sofia Rinaldi',
    guestEmoji: '🎯',
    tags: ['Technique', 'History'],
    audioUrl: SAMPLE_AUDIO,
  },
  {
    id: 6,
    number: 37,
    title: 'From the Junior Circuit to the Tour',
    description:
      'A rising star shares the grind of travel, qualifying rounds, and chasing a dream one tournament at a time.',
    date: 'May 2, 2026',
    duration: '50 min',
    guest: 'Rising Star Theo Nguyen',
    guestEmoji: '🌟',
    tags: ['Interview', 'Career'],
    audioUrl: SAMPLE_AUDIO,
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
