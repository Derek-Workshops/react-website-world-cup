import React, { useState, useEffect } from 'react';
import { Team } from '../data/mockData';
import { fetchGroupStandings } from '../api/sportsDb';

const GroupTable: React.FC<{ groupName: string; teams: Team[] }> = ({ groupName, teams }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
    <div className="bg-[#003087] px-5 py-3 flex items-center justify-between">
      <h3 className="font-black text-white text-lg tracking-wider">GROUP {groupName}</h3>
      <span className="text-[#f5a623] text-sm font-bold">Group Stage</span>
    </div>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
          <th className="text-left px-5 py-3 font-medium">Team</th>
          <th className="text-center px-3 py-3 font-medium">P</th>
          <th className="text-center px-3 py-3 font-medium">W</th>
          <th className="text-center px-3 py-3 font-medium">D</th>
          <th className="text-center px-3 py-3 font-medium">L</th>
          <th className="text-center px-3 py-3 font-medium">Pts</th>
        </tr>
      </thead>
      <tbody>
        {teams
          .sort((a, b) => b.points - a.points)
          .map((team, index) => (
            <tr
              key={team.id}
              className={`border-b border-white/5 last:border-0 transition-colors hover:bg-white/5 ${
                index < 2 ? 'border-l-2 border-l-[#f5a623]' : ''
              }`}
            >
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                      index < 2 ? 'bg-[#f5a623] text-[#0a0a1a]' : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="text-xl">{team.flag}</span>
                  <span className="text-white font-medium">{team.name}</span>
                </div>
              </td>
              <td className="text-center px-3 py-3.5 text-white/70">{team.played}</td>
              <td className="text-center px-3 py-3.5 text-white/70">{team.won}</td>
              <td className="text-center px-3 py-3.5 text-white/70">{team.drawn}</td>
              <td className="text-center px-3 py-3.5 text-white/70">{team.lost}</td>
              <td className="text-center px-3 py-3.5 font-black text-[#f5a623]">{team.points}</td>
            </tr>
          ))}
      </tbody>
    </table>
    <div className="px-5 py-2 bg-[#f5a623]/5 flex items-center gap-2">
      <div className="w-3 h-0.5 bg-[#f5a623]" />
      <span className="text-xs text-white/40">Advances to Round of 32</span>
    </div>
  </div>
);

const GroupsPage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [groups, setGroups] = useState<Record<string, Team[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchGroupStandings()
      .then(data => { if (!cancelled) setGroups(data); })
      .catch(err => console.error('Failed to fetch groups:', err))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const displayGroups = selectedGroup
    ? { [selectedGroup]: groups[selectedGroup] }
    : groups;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Group Stage
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Tournament Groups</h1>
        <p className="text-white/40 max-w-xl mx-auto">
          48 teams divided into 12 groups. The top 2 teams from each group advance to the Round of 32.
        </p>
      </div>

      {/* Group filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedGroup(null)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
            selectedGroup === null
              ? 'bg-[#f5a623] text-[#0a0a1a]'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          All Groups
        </button>
        {Object.keys(groups).map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGroup(g === selectedGroup ? null : g)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              selectedGroup === g
                ? 'bg-[#f5a623] text-[#0a0a1a]'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Group {g}
          </button>
        ))}
      </div>

      {/* Group tables */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-[#f5a623] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 mt-4">Loading group data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(displayGroups).map(([name, teams]) => (
            <GroupTable key={name} groupName={name} teams={teams} />
          ))}
        </div>
      )}

      {/* Info banner */}
      <div className="mt-12 bg-[#003087]/20 border border-[#003087]/40 rounded-2xl p-6 text-center">
        <p className="text-white/60 text-sm">
          Live data powered by <strong className="text-white/80">TheSportsDB</strong>. Standings update automatically as matches are played.
        </p>
      </div>
    </div>
  );
};

export default GroupsPage;
