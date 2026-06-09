import React, { useMemo, useState } from 'react';
import { useFixtures } from '../hooks/useFixtures';
import { getTeams, getGroupNames, TeamInfo } from '../services/worldCupApi';
import { LoadingState, ErrorState, EmptyState } from '../components/MatchListState';

const TeamCard: React.FC<{ team: TeamInfo }> = ({ team }) => (
  <div className="bg-white/5 border border-white/10 hover:border-[#f5a623]/50 hover:bg-white/8 rounded-2xl p-6 transition-all duration-200 group">
    <div className="flex justify-between items-start mb-4">
      {team.badge ? (
        <img
          src={team.badge}
          alt={team.name}
          className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-200"
          loading="lazy"
        />
      ) : (
        <span className="text-5xl">⚽</span>
      )}
      {team.group && (
        <div className="text-right">
          <div className="text-xs text-white/30 uppercase tracking-wider">Group</div>
          <div className="text-2xl font-black text-[#f5a623]">{team.group}</div>
        </div>
      )}
    </div>
    <h3 className="text-white font-bold text-lg">{team.name}</h3>
    <p className="text-white/40 text-sm mt-1">2026 FIFA World Cup</p>
  </div>
);

const TeamsPage: React.FC = () => {
  const { fixtures, loading, error } = useFixtures();
  const [activeGroup, setActiveGroup] = useState('All');
  const [search, setSearch] = useState('');

  const teams = useMemo(() => getTeams(fixtures), [fixtures]);
  const groupNames = useMemo(() => getGroupNames(fixtures), [fixtures]);
  const filters = ['All', ...groupNames];

  const filtered = teams.filter((t) => {
    const matchGroup = activeGroup === 'All' || t.group === activeGroup;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchGroup && matchSearch;
  });

  const renderBody = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (filtered.length === 0)
      return <EmptyState icon="🔍" title="No teams found" message="Try a different search or group." />;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((team) => (
          <TeamCard key={team.name} team={team} />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          {teams.length > 0 ? `${teams.length} Nations` : '48 Nations'}
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Tournament Teams</h1>
        <p className="text-white/40">The qualified nations competing for the 2026 FIFA World Cup</p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">🔍</span>
          <input
            type="text"
            placeholder="Search teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 focus:border-[#f5a623]/50 rounded-full pl-11 pr-4 py-3 text-white placeholder-white/30 outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* Group filter */}
      {groupNames.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((c) => (
            <button
              key={c}
              onClick={() => setActiveGroup(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                activeGroup === c
                  ? 'bg-[#f5a623] text-[#0a0a1a]'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
              }`}
            >
              {c === 'All' ? 'All' : `Group ${c}`}
            </button>
          ))}
        </div>
      )}

      {/* Teams grid */}
      {renderBody()}
    </div>
  );
};

export default TeamsPage;
