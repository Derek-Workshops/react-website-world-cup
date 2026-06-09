import React, { useState, useEffect, useMemo } from 'react';
import { fetchTeams, LiveTeam } from '../api/sportsDb';



const TeamsPage: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState('All');
  const [search, setSearch] = useState('');
  const [teams, setTeams] = useState<LiveTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchTeams()
      .then(data => { if (!cancelled) setTeams(data); })
      .catch(err => console.error('Failed to fetch teams:', err))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const groupLabels = useMemo(() => {
    const groups = new Set(teams.map(t => t.group));
    return ['All', ...Array.from(groups).sort()];
  }, [teams]);

  const filtered = teams.filter((t) => {
    const matchGroup = activeGroup === 'All' || t.group === activeGroup;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchGroup && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          48 Nations
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Tournament Teams</h1>
        <p className="text-white/40">Explore the qualified nations competing for the 2026 FIFA World Cup</p>
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
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {groupLabels.map((g) => (
          <button
            key={g}
            onClick={() => setActiveGroup(g)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              activeGroup === g
                ? 'bg-[#f5a623] text-[#0a0a1a]'
                : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
            }`}
          >
            {g === 'All' ? 'All' : `Group ${g}`}
          </button>
        ))}
      </div>

      {/* Teams grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-[#f5a623] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 mt-4">Loading teams...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((team) => (
            <div key={team.name} className="bg-white/5 border border-white/10 hover:border-[#f5a623]/50 hover:bg-white/[0.08] rounded-2xl p-6 cursor-pointer transition-all duration-200 group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-200">{team.flag}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#f5a623]/20 text-[#f5a623]">
                  Group {team.group}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg">{team.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white/30 py-16">No teams found.</p>
      )}

      {/* Info */}
      <div className="mt-12 bg-[#003087]/20 border border-[#003087]/40 rounded-2xl p-6 text-center">
        <p className="text-white/60 text-sm">
          {teams.length} nations competing. Live data from <strong className="text-white/80">TheSportsDB</strong>.
        </p>
      </div>
    </div>
  );
};

export default TeamsPage;
