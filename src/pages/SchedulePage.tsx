import React, { useState } from 'react';
import { Match } from '../data/mockData';
import { useWorldCupMatches } from '../hooks/useWorldCupMatches';

const MatchCard: React.FC<{ match: Match; isResult?: boolean }> = ({ match, isResult = false }) => (
  <div className="bg-white/5 border border-white/10 hover:border-[#f5a623]/40 rounded-2xl p-5 transition-all duration-200">
    <div className="flex justify-between items-center mb-4">
      <span className="text-xs text-[#f5a623] font-bold uppercase tracking-widest">{match.stage}</span>
      <div className="text-right">
        <div className="text-xs text-white/60 font-medium">{match.date}</div>
        <div className="text-xs text-white/30">{match.time} local</div>
      </div>
    </div>

    <div className="flex items-center gap-4">
      {/* Home */}
      <div className="flex-1 flex flex-col items-center gap-2">
        <span className="text-5xl">{match.homeFlag}</span>
        <span className="text-white font-semibold text-sm text-center">{match.homeTeam}</span>
      </div>

      {/* Score / VS */}
      <div className="flex flex-col items-center gap-1 min-w-[80px]">
        {isResult ? (
          <div className="bg-[#003087] rounded-xl px-4 py-2 text-white font-black text-2xl tabular-nums text-center">
            {match.homeScore} – {match.awayScore}
          </div>
        ) : (
          <div className="bg-white/10 rounded-xl px-4 py-2">
            <span className="text-white/60 font-bold text-sm">VS</span>
          </div>
        )}
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isResult ? 'bg-green-500/20 text-green-400' : 'bg-[#f5a623]/20 text-[#f5a623]'}`}>
          {isResult ? 'FT' : 'Upcoming'}
        </span>
      </div>

      {/* Away */}
      <div className="flex-1 flex flex-col items-center gap-2">
        <span className="text-5xl">{match.awayFlag}</span>
        <span className="text-white font-semibold text-sm text-center">{match.awayTeam}</span>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-white/40">
      <span>🏟️</span>
      <span className="truncate">{match.venue}</span>
    </div>
  </div>
);

const SchedulePage: React.FC = () => {
  const [activeStage, setActiveStage] = useState('All');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');
  const { upcoming, results, source } = useWorldCupMatches();

  const stages = [
    'All',
    ...Array.from(new Set([...upcoming, ...results].map((m) => m.stage))),
  ];

  const filterMatches = (matches: Match[]) =>
    activeStage === 'All' ? matches : matches.filter((m) => m.stage === activeStage);

  const upcomingFiltered = filterMatches(upcoming);
  const resultsFiltered = filterMatches(results);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Match Schedule
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Fixtures & Results</h1>
        <p className="text-white/40">All 104 matches of the 2026 FIFA World Cup</p>
        {source === 'live' && (
          <span className="inline-flex items-center gap-1.5 mt-4 bg-green-500/15 text-green-400 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live data
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {(['upcoming', 'results'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
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

      {/* Match cards */}
      {activeTab === 'upcoming' ? (
        upcomingFiltered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {upcomingFiltered.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        ) : (
          <p className="text-center text-white/30 py-16">No upcoming matches for this stage.</p>
        )
      ) : (
        resultsFiltered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {resultsFiltered.map((m) => (
              <MatchCard key={m.id} match={m} isResult />
            ))}
          </div>
        ) : (
          <p className="text-center text-white/30 py-16">No results for this stage yet.</p>
        )
      )}

      {/* Data source note */}
      <div className="mt-12 bg-[#003087]/20 border border-[#003087]/40 rounded-2xl p-6 text-center">
        <p className="text-white/60 text-sm">
          {source === 'live' ? (
            <>📡 <strong className="text-white/80">Live fixtures</strong> from ESPN's public football API.</>
          ) : (
            <>⚠️ <strong className="text-white/80">Showing cached data.</strong> Live fixtures are temporarily unavailable.</>
          )}
        </p>
      </div>
    </div>
  );
};

export default SchedulePage;
