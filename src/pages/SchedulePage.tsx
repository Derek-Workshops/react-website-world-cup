import React, { useState } from 'react';
import { upcomingMatches, recentResults, Match } from '../data/mockData';
import MatchCard from '../components/MatchCard';

const stages = ['All', 'Group A', 'Group B', 'Group C', 'Group D'];

const SchedulePage: React.FC = () => {
  const [activeStage, setActiveStage] = useState('All');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');

  const filterMatches = (matches: Match[]) =>
    activeStage === 'All' ? matches : matches.filter((m) => m.stage === activeStage);

  const upcomingFiltered = filterMatches(upcomingMatches);
  const resultsFiltered = filterMatches(recentResults);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Match Schedule
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Fixtures & Results</h1>
        <p className="text-white/40">All 104 matches of the 2026 FIFA World Cup</p>
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

      {/* Placeholder note */}
      <div className="mt-12 bg-[#003087]/20 border border-[#003087]/40 rounded-2xl p-6 text-center">
        <p className="text-white/60 text-sm">
          ⚠️ <strong className="text-white/80">Placeholder data.</strong> Full 104-match schedule will be populated here.
        </p>
      </div>
    </div>
  );
};

export default SchedulePage;
