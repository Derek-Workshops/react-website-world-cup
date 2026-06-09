// Content for the Simpson Thacher & Bartlett LLP — Latin America Practice Group
// demonstration website. All figures and profiles below are illustrative.

export interface PracticeArea {
  id: number;
  name: string;
  icon: string;
  description: string;
  highlights: string[];
}

export interface Matter {
  id: number;
  year: string;
  headline: string;
  description: string;
  type: string;
  country: string;
  flag: string;
}

export interface Lawyer {
  id: number;
  name: string;
  title: string;
  office: string;
  focus: string;
  languages: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface Recognition {
  source: string;
  quote: string;
  category: string;
}

export interface Office {
  city: string;
  country: string;
  flag: string;
  note: string;
}

// ─── Headline figures ───────────────────────────────────────────────
export const practiceStats: Stat[] = [
  { label: 'Years Serving the Region', value: '30+', icon: '🌎' },
  { label: 'Jurisdictions Covered', value: '15+', icon: '📍' },
  { label: 'Lawyers Across the Practice', value: '120+', icon: '⚖️' },
  { label: 'Languages Spoken', value: '3', icon: '🗣️' },
  { label: 'Aggregate Deal Value', value: '$500B+', icon: '📈' },
  { label: 'Year Firm Founded', value: '1884', icon: '🏛️' },
];

// ─── Practice areas ─────────────────────────────────────────────────
export const practiceAreas: PracticeArea[] = [
  {
    id: 1,
    name: 'Mergers & Acquisitions',
    icon: '🤝',
    description:
      'Cross-border acquisitions, joint ventures and strategic investments for leading corporations, sponsors and financial institutions throughout Latin America.',
    highlights: ['Public & private M&A', 'Joint ventures', 'Carve-outs & spin-offs'],
  },
  {
    id: 2,
    name: 'Capital Markets',
    icon: '📊',
    description:
      'Equity and debt offerings, including IPOs, follow-ons and international bond issuances by regional issuers in the U.S. and global markets.',
    highlights: ['IPOs & follow-ons', 'Investment-grade & high-yield bonds', 'Liability management'],
  },
  {
    id: 3,
    name: 'Banking & Project Finance',
    icon: '🏦',
    description:
      'Syndicated lending, acquisition finance and the financing of energy, infrastructure and natural-resources projects across the region.',
    highlights: ['Acquisition finance', 'Infrastructure & energy', 'Export credit'],
  },
  {
    id: 4,
    name: 'Private Equity & Funds',
    icon: '💼',
    description:
      'Fund formation, investments and exits for global and regional sponsors investing in Latin American markets and assets.',
    highlights: ['Fund formation', 'Buyouts & growth equity', 'Secondaries'],
  },
  {
    id: 5,
    name: 'International Arbitration',
    icon: '⚖️',
    description:
      'Complex commercial and investor-state arbitration before the leading international institutions, alongside cross-border litigation.',
    highlights: ['ICC & ICSID arbitration', 'Investor-state disputes', 'Enforcement'],
  },
  {
    id: 6,
    name: 'Restructuring',
    icon: '🔄',
    description:
      'Cross-border restructurings, refinancings and insolvency proceedings for companies, creditors and investors in the region.',
    highlights: ['Cross-border workouts', 'Creditor representation', 'Distressed M&A'],
  },
];

// ─── Representative matters ─────────────────────────────────────────
export const matters: Matter[] = [
  {
    id: 1,
    year: '2024',
    headline: 'US$2.5B cross-border acquisition',
    description:
      'Advised a multinational acquirer on the purchase of a leading consumer-goods platform with operations across Brazil and Mexico.',
    type: 'Mergers & Acquisitions',
    country: 'Brazil',
    flag: '🇧🇷',
  },
  {
    id: 2,
    year: '2024',
    headline: 'US$1.2B international bond offering',
    description:
      'Represented the underwriters on a benchmark senior notes offering by a regional energy company in the international capital markets.',
    type: 'Capital Markets',
    country: 'Mexico',
    flag: '🇲🇽',
  },
  {
    id: 3,
    year: '2023',
    headline: 'Renewable energy project financing',
    description:
      'Counsel to lenders on the financing of a portfolio of solar and wind projects, structured across multiple jurisdictions.',
    type: 'Project Finance',
    country: 'Chile',
    flag: '🇨🇱',
  },
  {
    id: 4,
    year: '2023',
    headline: 'Regional infrastructure fund',
    description:
      'Advised a global sponsor on the formation of an infrastructure fund targeting investments across the Andean region.',
    type: 'Private Equity & Funds',
    country: 'Colombia',
    flag: '🇨🇴',
  },
  {
    id: 5,
    year: '2022',
    headline: 'Landmark investor-state arbitration',
    description:
      'Secured a favorable award for an international investor in an ICSID arbitration arising from a regional infrastructure concession.',
    type: 'International Arbitration',
    country: 'Peru',
    flag: '🇵🇪',
  },
  {
    id: 6,
    year: '2022',
    headline: 'US$3B cross-border restructuring',
    description:
      'Represented an ad hoc creditor group in the restructuring of a major corporate borrower with assets across South America.',
    type: 'Restructuring',
    country: 'Argentina',
    flag: '🇦🇷',
  },
];

// ─── Key contacts (illustrative) ────────────────────────────────────
export const lawyers: Lawyer[] = [
  {
    id: 1,
    name: 'Mariana Oliveira',
    title: 'Partner — Head of Latin America',
    office: 'São Paulo',
    focus: 'M&A & Capital Markets',
    languages: 'Portuguese · English · Spanish',
  },
  {
    id: 2,
    name: 'Daniel Vásquez',
    title: 'Partner',
    office: 'New York',
    focus: 'Capital Markets',
    languages: 'Spanish · English',
  },
  {
    id: 3,
    name: 'Carolina Méndez',
    title: 'Partner',
    office: 'São Paulo',
    focus: 'Mergers & Acquisitions',
    languages: 'Portuguese · English',
  },
  {
    id: 4,
    name: 'Andrés Beltrán',
    title: 'Partner',
    office: 'New York',
    focus: 'Banking & Project Finance',
    languages: 'Spanish · English',
  },
  {
    id: 5,
    name: 'Lucía Fernández',
    title: 'Partner',
    office: 'New York',
    focus: 'International Arbitration',
    languages: 'Spanish · English · Portuguese',
  },
  {
    id: 6,
    name: 'Rafael Costa',
    title: 'Partner',
    office: 'São Paulo',
    focus: 'Private Equity & Funds',
    languages: 'Portuguese · English · Spanish',
  },
];

// ─── Recognition ────────────────────────────────────────────────────
export const recognitions: Recognition[] = [
  {
    source: 'Chambers Latin America',
    quote: 'Consistently ranked among the leading international firms for the region.',
    category: 'Corporate / M&A',
  },
  {
    source: 'Latin Lawyer 250',
    quote: 'A go-to practice for the most significant cross-border transactions.',
    category: 'Capital Markets',
  },
  {
    source: 'IFLR1000',
    quote: 'Highly regarded for banking, finance and capital markets work.',
    category: 'Banking & Finance',
  },
  {
    source: 'The Legal 500',
    quote: 'Recommended for international arbitration and dispute resolution.',
    category: 'Dispute Resolution',
  },
];

// ─── Offices serving the region ─────────────────────────────────────
export const offices: Office[] = [
  { city: 'New York', country: 'United States', flag: '🇺🇸', note: 'Global headquarters' },
  { city: 'São Paulo', country: 'Brazil', flag: '🇧🇷', note: 'Regional hub' },
  { city: 'Washington, D.C.', country: 'United States', flag: '🇺🇸', note: 'Arbitration & regulatory' },
  { city: 'London', country: 'United Kingdom', flag: '🇬🇧', note: 'International finance' },
];

// ─── Jurisdictions covered ──────────────────────────────────────────
export const jurisdictions = [
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Chile', flag: '🇨🇱' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Peru', flag: '🇵🇪' },
  { name: 'Panama', flag: '🇵🇦' },
  { name: 'Uruguay', flag: '🇺🇾' },
];
