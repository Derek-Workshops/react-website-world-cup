import React from 'react';

const topScorers = [
  { rank: 1, name: 'Lionel Messi', team: 'Argentina', flag: '🇦🇷', goals: 3, assists: 2 },
  { rank: 2, name: 'Kylian Mbappé', team: 'France', flag: '🇫🇷', goals: 2, assists: 1 },
  { rank: 3, name: 'Vinícius Jr.', team: 'Brazil', flag: '🇧🇷', goals: 2, assists: 3 },
  { rank: 4, name: 'Harry Kane', team: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: 2, assists: 0 },
  { rank: 5, name: 'Pedri', team: 'Spain', flag: '🇪🇸', goals: 1, assists: 2 },
];

const teamStats = [
  { team: 'Brazil', flag: '🇧🇷', goals: 5, shots: 28, possession: '64%', passAcc: '91%' },
  { team: 'Argentina', flag: '🇦🇷', goals: 4, shots: 24, possession: '58%', passAcc: '88%' },
  { team: 'France', flag: '🇫🇷', goals: 3, shots: 21, possession: '55%', passAcc: '87%' },
  { team: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: 3, shots: 19, possession: '52%', passAcc: '85%' },
];

const overallStats = [
  { label: 'Goals Scored', value: '24', sub: 'across 8 matches', icon: '⚽' },
  { label: 'Goals/Match', value: '3.0', sub: 'avg per game', icon: '📊' },
  { label: 'Yellow Cards', value: '19', sub: 'in group stage', icon: '🟨' },
  { label: 'Red Cards', value: '2', sub: 'in group stage', icon: '🟥' },
  { label: 'Penalties', value: '4', sub: 'awarded so far', icon: '🎯' },
  { label: 'Own Goals', value: '1', sub: 'recorded', icon: '🔄' },
];

const StatBar: React.FC<{ value: number; max: number; color?: string }> = ({
  value,
  max,
  color = '#f5a623',
}) => (
  <div className="w-full bg-white/10 rounded-full h-1.5">
    <div
      className="h-1.5 rounded-full transition-all duration-500"
      style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
    />
  </div>
);

const StatsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Live Statistics
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Tournament Stats</h1>
        <p className="text-white/40">Performance metrics and leaderboards from the 2026 World Cup</p>
      </div>

      {/* Overall Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {overallStats.map((s) => (
          <div
            key={s.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-[#f5a623]/30 transition-colors"
          >
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-3xl font-black text-[#f5a623]">{s.value}</div>
            <div className="text-white font-semibold text-sm mt-1">{s.label}</div>
            <div className="text-white/30 text-xs mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Scorers */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-[#003087] px-6 py-4">
            <h2 className="text-white font-black text-lg">⚽ Top Scorers</h2>
          </div>
          <div className="divide-y divide-white/5">
            {topScorers.map((player) => (
              <div key={player.rank} className="px-6 py-4 flex items-center gap-4 hover:bg-white/3 transition-colors">
                <span
                  className={`text-sm font-black w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    player.rank === 1
                      ? 'bg-[#f5a623] text-[#0a0a1a]'
                      : player.rank === 2
                      ? 'bg-white/30 text-white'
                      : player.rank === 3
                      ? 'bg-[#cd7f32]/50 text-white'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {player.rank}
                </span>
                <span className="text-2xl">{player.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold truncate">{player.name}</div>
                  <div className="text-white/40 text-xs">{player.team}</div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-[#f5a623] font-black text-xl">{player.goals}</div>
                    <div className="text-white/30 text-xs">Goals</div>
                  </div>
                  <div>
                    <div className="text-white/70 font-bold text-xl">{player.assists}</div>
                    <div className="text-white/30 text-xs">Assists</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-[#c8102e] px-6 py-4">
            <h2 className="text-white font-black text-lg">📊 Team Performance</h2>
          </div>
          <div className="p-6 space-y-6">
            {teamStats.map((team, index) => (
              <div key={team.team}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{team.flag}</span>
                    <span className="text-white font-semibold">{team.team}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-white/50">{team.possession} poss.</span>
                    <span className="text-[#f5a623] font-bold">{team.goals} goals</span>
                  </div>
                </div>
                <StatBar value={team.goals} max={teamStats[0].goals} color={index === 0 ? '#f5a623' : '#003087'} />
                <div className="flex justify-between mt-1.5 text-xs text-white/30">
                  <span>{team.shots} shots</span>
                  <span>{team.passAcc} pass acc.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Placeholder chart area */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">📈</div>
        <h3 className="text-white font-bold text-xl mb-2">Advanced Analytics Coming Soon</h3>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          Interactive charts, heat maps, and xG data will be available here once the tournament progresses.
          This is a placeholder section ideal for integrating a charting library.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto opacity-30">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/10 rounded-xl h-24 flex items-end justify-center pb-3 gap-1">
              {[...Array(5)].map((_, j) => (
                <div
                  key={j}
                  className="bg-[#f5a623] rounded-sm w-3"
                  style={{ height: `${(Math.random() * 60 + 20)}%` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
