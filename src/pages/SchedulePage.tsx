import React, { useMemo, useState } from 'react';
import MatchCard from '../components/MatchCard';
import { useWorldCupMatches } from '../hooks/useWorldCupMatches';

const SkeletonCard: React.FC = () => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse">
    <div className="flex justify-between mb-6">
      <div className="h-3 w-20 bg-white/10 rounded" />
      <div className="h-3 w-12 bg-white/10 rounded" />
    </div>
    <div className="flex items-center justify-between">
      <div className="w-12 h-12 rounded-full bg-white/10" />
      <div className="h-8 w-16 bg-white/10 rounded-xl" />
      <div className="w-12 h-12 rounded-full bg-white/10" />
    </div>
    <div className="h-3 w-full bg-white/10 rounded mt-6" />
  </div>
);

const SchedulePage: React.FC = () => {
  const { upcoming, results, loading, error, source } = useWorldCupMatches();
  const [activeStage, setActiveStage] = useState('All');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');

  const activeMatches = activeTab === 'upcoming' ? upcoming : results;

  // Build the stage filter dynamically from whichever matches are loaded.
  const stages = useMemo(() => {
    const unique = Array.from(new Set(activeMatches.map((m) => m.stage)));
    return ['All', ...unique];
  }, [activeMatches]);

  const filtered =
    activeStage === 'All' ? activeMatches : activeMatches.filter((m) => m.stage === activeStage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Match Schedule
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Fixtures & Results</h1>
        <p className="text-white/40">Live 2026 FIFA World Cup fixtures</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {(['upcoming', 'results'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setActiveStage('All'); }}
            className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-colors ${
              activeTab === tab
                ? 'bg-[#f5a623] text-[#0a0a1a]'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {tab === 'upcoming' ? 'Upcoming' : 'Results'}
          </button>
        ))}
      </div>

      {/* Stage filter */}
      {!loading && stages.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {stages.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStage(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                activeStage === s
                  ? 'bg-[#003087] text-white border border-[#003087]'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Match cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <MatchCard key={m.id} match={m} isResult={activeTab === 'results'} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white/30 py-16">
          {activeTab === 'upcoming'
            ? 'No upcoming matches for this stage.'
            : 'No results yet — the tournament has not started.'}
        </p>
      )}

      {/* Data source note */}
      <div
        className={`mt-12 rounded-2xl p-6 text-center border ${
          source === 'live'
            ? 'bg-green-500/10 border-green-500/30'
            : 'bg-[#003087]/20 border-[#003087]/40'
        }`}
      >
        {source === 'live' ? (
          <p className="text-white/60 text-sm">
            🟢 <strong className="text-white/80">Live data</strong> from TheSportsDB · FIFA World Cup 2026
          </p>
        ) : (
          <p className="text-white/60 text-sm">
            ⚠️ <strong className="text-white/80">Showing sample data.</strong> Live feed unavailable
            {error ? ` (${error})` : ''}.
          </p>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
