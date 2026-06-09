import React, { useState, useEffect } from 'react';
import { Match } from '../data/mockData';
import { fetchUpcomingMatches, fetchRecentResults } from '../api/sportsDb';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center bg-white/5 rounded-xl px-5 py-3 min-w-[72px]">
    <span className="text-3xl font-bold text-[#f5a623] tabular-nums">{String(value).padStart(2, '0')}</span>
    <span className="text-xs text-white/50 uppercase tracking-wider mt-1">{label}</span>
  </div>
);

const LoadingCard: React.FC = () => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse">
    <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
    <div className="h-6 bg-white/10 rounded w-full mb-3" />
    <div className="h-3 bg-white/10 rounded w-2/3" />
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [upcoming, setUpcoming] = useState<Match[]>([]);
  const [results, setResults] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [up, res] = await Promise.all([
          fetchUpcomingMatches(),
          fetchRecentResults(),
        ]);
        if (!cancelled) {
          setUpcoming(up);
          setResults(res);
        }
      } catch (err) {
        console.error('Failed to fetch live data:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const openingMatch = new Date('2026-06-11T19:00:00Z');
  const now = new Date();
  const diff = Math.max(0, openingMatch.getTime() - now.getTime());
  const countdown = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };

  return (
    <div>
      {/* ─── Hero ─── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a1a 0%, #001a4d 50%, #0a0a1a 100%)',
        }}
      >
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#003087]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <span className="text-8xl md:text-9xl drop-shadow-2xl">🏆</span>
          </div>

          <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-6">
            June 11 – July 19, 2026
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-none mb-4 tracking-tight">
            FIFA WORLD
            <span className="block text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #f5a623, #ffd700, #f5a623)' }}>
              CUP 2026
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-4">
            The biggest FIFA World Cup in history. 48 teams. 3 host nations.
            104 matches across North America.
          </p>

          <div className="flex items-center justify-center gap-3 mb-10 text-sm text-white/50">
            <span className="flex items-center gap-1.5">🇺🇸 United States</span>
            <span className="text-[#f5a623]">•</span>
            <span className="flex items-center gap-1.5">🇨🇦 Canada</span>
            <span className="text-[#f5a623]">•</span>
            <span className="flex items-center gap-1.5">🇲🇽 Mexico</span>
          </div>

          {/* Countdown */}
          <div className="mb-10">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Opening Match Countdown</p>
            <div className="flex justify-center gap-3">
              <CountdownUnit value={countdown.days} label="Days" />
              <CountdownUnit value={countdown.hours} label="Hours" />
              <CountdownUnit value={countdown.minutes} label="Mins" />
              <CountdownUnit value={countdown.seconds} label="Secs" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate('schedule')}
              className="bg-[#f5a623] hover:bg-[#e09510] text-[#0a0a1a] font-bold px-8 py-3.5 rounded-full transition-colors duration-200 shadow-lg shadow-[#f5a623]/20"
            >
              View Schedule
            </button>
            <button
              onClick={() => onNavigate('groups')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-full transition-colors duration-200 border border-white/20"
            >
              Explore Groups
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ─── Tournament Stats Strip ─── */}
      <section className="bg-[#f5a623] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: '\u26BD', value: '104', label: 'Matches' },
              { icon: '\u{1F3DF}\u{FE0F}', value: '48', label: 'Teams' },
              { icon: '\u{1F1FA}\u{1F1F8}', value: 'USA', label: 'Host' },
              { icon: '\u{1F1E8}\u{1F1E6}', value: 'Canada', label: 'Host' },
              { icon: '\u{1F1F2}\u{1F1FD}', value: 'Mexico', label: 'Host' },
              { icon: '\u{1F30E}', value: '16', label: 'Cities' },
            ].map((stat) => (
              <div key={stat.label + stat.value} className="text-center">
                <div className="text-2xl mb-0.5">{stat.icon}</div>
                <div className="text-[#0a0a1a] font-black text-xl">{stat.value}</div>
                <div className="text-[#0a0a1a]/60 text-xs font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Upcoming Matches ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white">Upcoming Matches</h2>
            <p className="text-white/40 text-sm mt-1">Next fixtures in the group stage</p>
          </div>
        </div>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map(i => <LoadingCard key={i} />)}
          </div>
        ) : upcoming.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.slice(0, 6).map((match) => (
              <div key={match.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#f5a623] uppercase tracking-wider">{match.stage}</span>
                  <span className="text-xs text-white/40">{match.date} · {match.time}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-2xl">{match.homeFlag}</span>
                    <span className="text-white font-bold text-sm truncate">{match.homeTeam}</span>
                  </div>
                  <span className="text-white/30 text-xs font-bold">VS</span>
                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                    <span className="text-white font-bold text-sm truncate">{match.awayTeam}</span>
                    <span className="text-2xl">{match.awayFlag}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 text-xs text-white/30 truncate">📍 {match.venue}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/30 py-10">No upcoming matches scheduled yet.</p>
        )}
      </section>

      {/* ─── Recent Results ─── */}
      <section className="border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white mb-8">Recent Results</h2>
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1,2,3].map(i => <LoadingCard key={i} />)}
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, 6).map((match) => (
                <div key={match.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#f5a623] uppercase tracking-wider">{match.stage}</span>
                    <span className="text-xs text-white/40">{match.date}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-2xl">{match.homeFlag}</span>
                      <span className="text-white font-bold text-sm truncate">{match.homeTeam}</span>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-1 flex items-center gap-1.5">
                      <span className="text-white font-black text-lg">{match.homeScore}</span>
                      <span className="text-white/30 text-xs">–</span>
                      <span className="text-white font-black text-lg">{match.awayScore}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <span className="text-white font-bold text-sm truncate">{match.awayTeam}</span>
                      <span className="text-2xl">{match.awayFlag}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/5 text-xs text-white/30 truncate">📍 {match.venue}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/30 py-10">No results yet — the tournament hasn't started.</p>
          )}
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #003087, #c8102e)' }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          <div className="relative z-10">
            <span className="text-6xl mb-4 block">⚽</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Don't Miss a Single Match
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Explore team profiles, live standings, and the full match schedule for the 2026 FIFA World Cup.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => onNavigate('teams')}
                className="bg-[#f5a623] hover:bg-[#e09510] text-[#0a0a1a] font-bold px-8 py-3.5 rounded-full transition-colors duration-200"
              >
                Explore Teams
              </button>
              <button
                onClick={() => onNavigate('stats')}
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-3.5 rounded-full transition-colors duration-200"
              >
                View Stats
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
