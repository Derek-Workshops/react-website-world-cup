import React, { useMemo } from 'react';
import { useFixtures } from '../hooks/useFixtures';
import { getResults, buildStandings, Standing } from '../services/worldCupApi';
import { LoadingState, ErrorState, EmptyState } from '../components/MatchListState';

const StatBar: React.FC<{ value: number; max: number; color?: string }> = ({
  value,
  max,
  color = '#f5a623',
}) => (
  <div className="w-full bg-white/10 rounded-full h-1.5">
    <div
      className="h-1.5 rounded-full transition-all duration-500"
      style={{ width: `${max > 0 ? (value / max) * 100 : 0}%`, backgroundColor: color }}
    />
  </div>
);

const TeamBadge: React.FC<{ name: string; badge: string | null }> = ({ name, badge }) =>
  badge ? (
    <img src={badge} alt={name} className="w-6 h-6 object-contain" loading="lazy" />
  ) : (
    <span className="text-xl">⚽</span>
  );

const StatsPage: React.FC = () => {
  const { fixtures, loading, error } = useFixtures();

  const results = useMemo(() => getResults(fixtures), [fixtures]);
  const standings = useMemo(() => buildStandings(fixtures), [fixtures]);

  const allStandings = useMemo<Standing[]>(
    () => Object.values(standings).flat(),
    [standings],
  );

  const matchesPlayed = results.length;
  const goals = results.reduce((sum, f) => sum + (f.homeScore ?? 0) + (f.awayScore ?? 0), 0);
  const goalsPerMatch = matchesPlayed > 0 ? (goals / matchesPlayed).toFixed(1) : '—';

  const goalLeaders = useMemo(
    () =>
      allStandings
        .filter((s) => s.played > 0)
        .sort((a, b) => b.goalsFor - a.goalsFor || b.goalDiff - a.goalDiff)
        .slice(0, 5),
    [allStandings],
  );

  const groupLeaders = useMemo(
    () =>
      Object.entries(standings)
        .map(([group, teams]) => ({ group, leader: teams[0] }))
        .filter((g) => g.leader && g.leader.played > 0),
    [standings],
  );

  const overallStats = [
    { label: 'Teams', value: '48', icon: '🏳️' },
    { label: 'Groups', value: '12', icon: '🗂️' },
    { label: 'Group Matches', value: String(fixtures.length), icon: '🗓️' },
    { label: 'Matches Played', value: String(matchesPlayed), icon: '⚽' },
    { label: 'Goals Scored', value: String(goals), icon: '🥅' },
    { label: 'Goals / Match', value: goalsPerMatch, icon: '📊' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Live Statistics
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Tournament Stats</h1>
        <p className="text-white/40">Real metrics from the 2026 World Cup — updated as matches are played</p>
      </div>

      {error && <div className="mb-8"><ErrorState message={error} /></div>}

      {/* Overall Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {overallStats.map((s) => (
          <div
            key={s.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-[#f5a623]/30 transition-colors"
          >
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-3xl font-black text-[#f5a623]">{loading ? '–' : s.value}</div>
            <div className="text-white font-semibold text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Goal Leaders */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-[#003087] px-6 py-4">
            <h2 className="text-white font-black text-lg">⚽ Goal Leaders (by team)</h2>
          </div>
          {loading ? (
            <div className="p-6"><LoadingState /></div>
          ) : goalLeaders.length === 0 ? (
            <EmptyState
              icon="⚽"
              title="No goals yet"
              message="Goal leaders will appear here once matches are played."
            />
          ) : (
            <div className="divide-y divide-white/5">
              {goalLeaders.map((team, i) => (
                <div key={team.team} className="px-6 py-4 flex items-center gap-4">
                  <span
                    className={`text-sm font-black w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      i === 0 ? 'bg-[#f5a623] text-[#0a0a1a]' : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <TeamBadge name={team.team} badge={team.badge} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold truncate">{team.team}</div>
                    <div className="text-white/40 text-xs">{team.played} played</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#f5a623] font-black text-xl">{team.goalsFor}</div>
                    <div className="text-white/30 text-xs">Goals</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Group Leaders */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-[#c8102e] px-6 py-4">
            <h2 className="text-white font-black text-lg">🏆 Group Leaders</h2>
          </div>
          {loading ? (
            <div className="p-6"><LoadingState /></div>
          ) : groupLeaders.length === 0 ? (
            <EmptyState
              icon="🏆"
              title="No standings yet"
              message="Group leaders will appear here once matches are played."
            />
          ) : (
            <div className="p-6 space-y-5">
              {groupLeaders.map(({ group, leader }) => (
                <div key={group}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white/40 w-14">Group {group}</span>
                      <TeamBadge name={leader.team} badge={leader.badge} />
                      <span className="text-white font-semibold">{leader.team}</span>
                    </div>
                    <span className="text-[#f5a623] font-bold text-sm">{leader.points} pts</span>
                  </div>
                  <StatBar value={leader.points} max={9} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live note */}
      <div className="mt-8 bg-[#003087]/20 border border-[#003087]/40 rounded-2xl p-6 text-center">
        <p className="text-white/60 text-sm">
          📡 <strong className="text-white/80">Live data.</strong> These figures are calculated from real match
          results and update automatically as the tournament progresses. Player-level stats (top scorers, assists)
          aren't available from the current free data source.
        </p>
      </div>
    </div>
  );
};

export default StatsPage;
