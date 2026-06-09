import React, { useMemo, useState } from 'react';
import MatchCard from '../components/MatchCard';
import { LoadingState, ErrorState, EmptyState } from '../components/MatchListState';
import { useFixtures } from '../hooks/useFixtures';
import { getUpcoming, getResults, getGroupNames } from '../services/worldCupApi';

const SchedulePage: React.FC = () => {
  const { fixtures, loading, error } = useFixtures();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');
  const [activeGroup, setActiveGroup] = useState('All');

  const groupNames = useMemo(() => getGroupNames(fixtures), [fixtures]);
  const scoped = useMemo(
    () => (activeGroup === 'All' ? fixtures : fixtures.filter((f) => f.group === activeGroup)),
    [fixtures, activeGroup],
  );
  const upcoming = useMemo(() => getUpcoming(scoped), [scoped]);
  const results = useMemo(() => getResults(scoped), [scoped]);
  const list = activeTab === 'upcoming' ? upcoming : results;

  const renderBody = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (list.length === 0) {
      return activeTab === 'upcoming' ? (
        <EmptyState icon="🗓️" title="No fixtures listed" message="Upcoming fixtures will appear here." />
      ) : (
        <EmptyState
          icon="⚽"
          title="No results yet"
          message="Match results will appear here once the tournament kicks off."
        />
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Match Schedule
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Fixtures & Results</h1>
        <p className="text-white/40">Live fixtures for the 2026 FIFA World Cup</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-10">
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
            {tab === 'upcoming' ? `Upcoming (${upcoming.length})` : `Results (${results.length})`}
          </button>
        ))}
      </div>

      {/* Group filter */}
      {groupNames.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['All', ...groupNames].map((g) => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                activeGroup === g
                  ? 'bg-[#003087] text-white'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
              }`}
            >
              {g === 'All' ? 'All Groups' : `Group ${g}`}
            </button>
          ))}
        </div>
      )}

      {/* Match cards */}
      {renderBody()}
    </div>
  );
};

export default SchedulePage;
