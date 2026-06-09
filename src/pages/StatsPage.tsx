import React from 'react';

const topScorers = [
  { rank: 1, name: 'Shai Gilgeous-Alexander', team: 'Oklahoma City Thunder', logo: '⚡', points: 30.4, assists: 6.2 },
  { rank: 2, name: 'Jayson Tatum', team: 'Boston Celtics', logo: '🍀', points: 28.3, assists: 5.8 },
  { rank: 3, name: 'Jaylen Brown', team: 'Boston Celtics', logo: '🍀', points: 24.7, assists: 4.1 },
  { rank: 4, name: 'Jalen Williams', team: 'Oklahoma City Thunder', logo: '⚡', points: 21.5, assists: 5.0 },
  { rank: 5, name: 'Chet Holmgren', team: 'Oklahoma City Thunder', logo: '⚡', points: 18.9, assists: 2.3 },
];

const teamStats = [
  { team: 'Boston Celtics', logo: '🍀', ppg: 114.3, fgPct: '48.1%', threePct: '38.5%', reb: '45.2' },
  { team: 'Oklahoma City Thunder', logo: '⚡', ppg: 110.7, fgPct: '47.2%', threePct: '36.1%', reb: '43.8' },
];

const overallStats = [
  { label: 'Points/Game', value: '112.4', sub: 'series average', icon: '🏀' },
  { label: 'Field Goal %', value: '47.8', sub: 'both teams', icon: '🎯' },
  { label: '3-Pointers', value: '28.3', sub: 'made per game', icon: '🏹' },
  { label: 'Rebounds', value: '44.6', sub: 'per game', icon: '💪' },
  { label: 'Assists', value: '25.1', sub: 'per game', icon: '🤝' },
  { label: 'Lead Changes', value: '14', sub: 'per game avg', icon: '🔄' },
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
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Finals Stats</h1>
        <p className="text-white/40">Performance metrics and leaderboards from the 2026 NBA Finals</p>
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
        {/* Points Leaders */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-[#003087] px-6 py-4">
            <h2 className="text-white font-black text-lg">🏀 Points Leaders</h2>
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
                <span className="text-2xl">{player.logo}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold truncate">{player.name}</div>
                  <div className="text-white/40 text-xs">{player.team}</div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-[#f5a623] font-black text-xl">{player.points}</div>
                    <div className="text-white/30 text-xs">PPG</div>
                  </div>
                  <div>
                    <div className="text-white/70 font-bold text-xl">{player.assists}</div>
                    <div className="text-white/30 text-xs">APG</div>
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
                    <span className="text-2xl">{team.logo}</span>
                    <span className="text-white font-semibold">{team.team}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-white/50">{team.fgPct} FG</span>
                    <span className="text-[#f5a623] font-bold">{team.ppg} PPG</span>
                  </div>
                </div>
                <StatBar value={team.ppg} max={teamStats[0].ppg} color={index === 0 ? '#f5a623' : '#003087'} />
                <div className="flex justify-between mt-1.5 text-xs text-white/30">
                  <span>{team.threePct} from three</span>
                  <span>{team.reb} rebounds</span>
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
          Interactive shot charts, hustle stats, and clutch-time data will be available here as the series progresses.
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
