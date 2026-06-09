import React, { useState } from 'react';
import { standings, Team } from '../data/mockData';

const ConferenceTable: React.FC<{ conference: string; teams: Team[] }> = ({ conference, teams }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
    <div className="bg-[#003087] px-5 py-3 flex items-center justify-between">
      <h3 className="font-black text-white text-lg tracking-wider">{conference.toUpperCase()} CONFERENCE</h3>
      <span className="text-[#f5a623] text-sm font-bold">Regular Season</span>
    </div>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
          <th className="text-left px-5 py-3 font-medium">Team</th>
          <th className="text-center px-3 py-3 font-medium">W</th>
          <th className="text-center px-3 py-3 font-medium">L</th>
          <th className="text-center px-3 py-3 font-medium">Pct</th>
          <th className="text-center px-3 py-3 font-medium">GB</th>
        </tr>
      </thead>
      <tbody>
        {teams
          .sort((a, b) => b.won - a.won)
          .map((team, index) => (
            <tr
              key={team.id}
              className={`border-b border-white/5 last:border-0 transition-colors hover:bg-white/5 ${
                index < 6 ? 'border-l-2 border-l-[#f5a623]' : ''
              }`}
            >
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                      index < 6 ? 'bg-[#f5a623] text-[#0a0a1a]' : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="text-xl">{team.logo}</span>
                  <span className="text-white font-medium">{team.name}</span>
                </div>
              </td>
              <td className="text-center px-3 py-3.5 text-white/70">{team.won}</td>
              <td className="text-center px-3 py-3.5 text-white/70">{team.lost}</td>
              <td className="text-center px-3 py-3.5 text-white/70">{team.pct}</td>
              <td className="text-center px-3 py-3.5 font-black text-[#f5a623]">{team.gb}</td>
            </tr>
          ))}
      </tbody>
    </table>
    <div className="px-5 py-2 bg-[#f5a623]/5 flex items-center gap-2">
      <div className="w-3 h-0.5 bg-[#f5a623]" />
      <span className="text-xs text-white/40">Seeds 1–6 clinch a playoff berth · 7–8 enter the Play-In</span>
    </div>
  </div>
);

const GroupsPage: React.FC = () => {
  const [selectedConf, setSelectedConf] = useState<'East' | 'West' | null>(null);

  const displayConfs: ['East' | 'West', Team[]][] = selectedConf
    ? [[selectedConf, standings[selectedConf]]]
    : [['East', standings.East], ['West', standings.West]];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Regular Season
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Conference Standings</h1>
        <p className="text-white/40 max-w-xl mx-auto">
          30 teams across two conferences. The top 8 from each conference reach the postseason on the road to the Finals.
        </p>
      </div>

      {/* Conference filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedConf(null)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
            selectedConf === null
              ? 'bg-[#f5a623] text-[#0a0a1a]'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          Both Conferences
        </button>
        {(['East', 'West'] as const).map((c) => (
          <button
            key={c}
            onClick={() => setSelectedConf(c === selectedConf ? null : c)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              selectedConf === c
                ? 'bg-[#f5a623] text-[#0a0a1a]'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {c}ern
          </button>
        ))}
      </div>

      {/* Conference tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayConfs.map(([name, teams]) => (
          <ConferenceTable key={name} conference={name} teams={teams} />
        ))}
      </div>

      {/* Info banner */}
      <div className="mt-12 bg-[#003087]/20 border border-[#003087]/40 rounded-2xl p-6 text-center">
        <p className="text-white/60 text-sm">
          ⚠️ <strong className="text-white/80">Placeholder data only.</strong> These standings are for demonstration purposes.
          All records and team data are fictional.
        </p>
      </div>
    </div>
  );
};

export default GroupsPage;
