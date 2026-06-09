import React, { useState } from 'react';
import { featuredTeams } from '../data/mockData';

const conferences = ['All', 'East', 'West'];

interface TeamCardProps {
  name: string;
  logo: string;
  seed: number;
  coach: string;
  conference: string;
  record: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, logo, seed, coach, conference, record }) => (
  <div className="bg-white/5 border border-white/10 hover:border-[#f5a623]/50 hover:bg-white/8 rounded-2xl p-6 cursor-pointer transition-all duration-200 group">
    <div className="flex justify-between items-start mb-4">
      <span className="text-5xl group-hover:scale-110 transition-transform duration-200">{logo}</span>
      <div className="text-right">
        <div className="text-xs text-white/30 uppercase tracking-wider">Seed</div>
        <div className="text-2xl font-black text-[#f5a623]">#{seed}</div>
      </div>
    </div>
    <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
    <div className="text-white/40 text-sm mb-3">{record} record</div>
    <div className="flex items-center justify-between mt-3">
      <div>
        <div className="text-xs text-white/30 uppercase tracking-wider">Head Coach</div>
        <div className="text-white/70 text-sm">{coach}</div>
      </div>
      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
        conference === 'East' ? 'bg-blue-500/20 text-blue-400' :
        'bg-red-500/20 text-red-400'
      }`}>
        {conference}
      </span>
    </div>
  </div>
);

const TeamsPage: React.FC = () => {
  const [activeConf, setActiveConf] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = featuredTeams.filter((t) => {
    const matchConf = activeConf === 'All' || t.conference === activeConf;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchConf && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          16 Playoff Teams
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Playoff Teams</h1>
        <p className="text-white/40">Explore the teams that made the 2026 NBA postseason</p>
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

      {/* Conference filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {conferences.map((c) => (
          <button
            key={c}
            onClick={() => setActiveConf(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              activeConf === c
                ? 'bg-[#f5a623] text-[#0a0a1a]'
                : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
            }`}
          >
            {c === 'All' ? 'All' : `${c}ern`}
          </button>
        ))}
      </div>

      {/* Teams grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((team) => (
            <TeamCard key={team.name} {...team} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white/30 py-16">No teams found.</p>
      )}

      {/* Summary cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: '🏀', label: 'Eastern Conference', count: '8 teams' },
          { icon: '🌅', label: 'Western Conference', count: '8 teams' },
          { icon: '🏆', label: 'NBA Finals', count: '2 teams' },
        ].map((conf) => (
          <div key={conf.label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <span className="text-3xl">{conf.icon}</span>
            <div>
              <div className="text-white font-bold">{conf.label}</div>
              <div className="text-white/40 text-sm">{conf.count} in the bracket</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
