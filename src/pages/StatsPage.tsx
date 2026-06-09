import React, { useState, useEffect } from 'react';
import { Match } from '../data/mockData';
import { fetchAllGroupMatches } from '../api/sportsDb';

const StatBar: React.FC<{ value: number; max: number; color?: string }> = ({
  value,
  max,
  color = '#f5a623',
}) => (
  <div className="w-full bg-white/10 rounded-full h-1.5">
    <div
      className="h-1.5 rounded-full transition-all duration-500"
      style={{ width: max > 0 ? `${(value / max) * 100}%` : '0%', backgroundColor: color }}
    />
  </div>
);

interface TeamGoals {
  team: string;
  flag: string;
  goals: number;
}

const StatsPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchAllGroupMatches()
      .then(data => { if (!cancelled) setMatches(data); })
      .catch(err => console.error('Failed to fetch stats:', err))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const playedMatches = matches.filter(m => m.homeScore != null);
  const totalGoals = playedMatches.reduce((sum, m) => sum + (m.homeScore || 0) + (m.awayScore || 0), 0);
  const totalMatches = playedMatches.length;
  const avgGoals = totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : '0';

  const draws = playedMatches.filter(m => m.homeScore === m.awayScore).length;
  const scheduledMatches = matches.length;

  const teamGoalsMap = new Map<string, { flag: string; goals: number }>();
  for (const m of playedMatches) {
    if (m.homeScore != null) {
      const existing = teamGoalsMap.get(m.homeTeam) || { flag: m.homeFlag, goals: 0 };
      existing.goals += m.homeScore;
      teamGoalsMap.set(m.homeTeam, existing);
    }
    if (m.awayScore != null) {
      const existing = teamGoalsMap.get(m.awayTeam) || { flag: m.awayFlag, goals: 0 };
      existing.goals += m.awayScore;
      teamGoalsMap.set(m.awayTeam, existing);
    }
  }
  const topTeams: TeamGoals[] = Array.from(teamGoalsMap.entries())
    .map(([team, data]) => ({ team, flag: data.flag, goals: data.goals }))
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 6);

  const overallStats = [
    { label: 'Matches Played', value: String(totalMatches), sub: `of ${scheduledMatches} scheduled`, icon: '\u{1F3DF}\u{FE0F}' },
    { label: 'Total Goals', value: String(totalGoals), sub: `across ${totalMatches} matches`, icon: '\u26BD' },
    { label: 'Goals/Match', value: avgGoals, sub: 'avg per game', icon: '\u{1F4CA}' },
    { label: 'Draws', value: String(draws), sub: 'matches drawn', icon: '\u{1F91D}' },
    { label: 'Teams', value: '48', sub: 'nations competing', icon: '\u{1F30E}' },
    { label: 'Host Cities', value: '16', sub: 'across 3 countries', icon: '\u{1F3D9}\u{FE0F}' },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-block w-8 h-8 border-2 border-[#f5a623] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/40 mt-4">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Live Statistics
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Tournament Stats</h1>
        <p className="text-white/40">Performance metrics from the 2026 World Cup, updated live</p>
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

      {/* Team Goals Leaderboard */}
      {topTeams.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-[#003087] px-6 py-4">
              <h2 className="text-white font-black text-lg">{'\u26BD'} Top Scoring Teams</h2>
            </div>
            <div className="p-6 space-y-6">
              {topTeams.map((team, index) => (
                <div key={team.team}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{team.flag}</span>
                      <span className="text-white font-semibold">{team.team}</span>
                    </div>
                    <span className="text-[#f5a623] font-bold">{team.goals} goals</span>
                  </div>
                  <StatBar value={team.goals} max={topTeams[0].goals} color={index === 0 ? '#f5a623' : '#003087'} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-[#c8102e] px-6 py-4">
              <h2 className="text-white font-black text-lg">{'\u{1F4CA}'} Match Results Breakdown</h2>
            </div>
            <div className="p-6 space-y-4">
              {playedMatches.slice(0, 8).map((m) => (
                <div key={m.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-lg">{m.homeFlag}</span>
                    <span className="text-white text-sm truncate">{m.homeTeam}</span>
                  </div>
                  <div className="bg-white/10 rounded px-2 py-0.5 mx-2">
                    <span className="text-white font-bold text-sm">{m.homeScore} - {m.awayScore}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                    <span className="text-white text-sm truncate">{m.awayTeam}</span>
                    <span className="text-lg">{m.awayFlag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-4">{'\u26BD'}</div>
          <h3 className="text-white font-bold text-xl mb-2">Tournament Hasn't Started Yet</h3>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Stats will populate automatically once matches begin on June 11, 2026.
            Check back during the tournament for live goals, results, and team performance data.
          </p>
        </div>
      )}

      {/* Info */}
      <div className="mt-8 bg-[#003087]/20 border border-[#003087]/40 rounded-2xl p-6 text-center">
        <p className="text-white/60 text-sm">
          Live data powered by <strong className="text-white/80">TheSportsDB</strong>. Stats update automatically as matches are played.
        </p>
      </div>
    </div>
  );
};

export default StatsPage;
