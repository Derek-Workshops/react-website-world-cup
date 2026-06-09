import React from 'react';

// The tournament kicks off on June 11, 2026, so no match statistics exist yet.
// These are real, verifiable tournament facts rather than fabricated live numbers.
const tournamentFacts = [
  { label: 'Teams', value: '48', sub: 'most ever', icon: '👥' },
  { label: 'Groups', value: '12', sub: 'of 4 teams', icon: '🔤' },
  { label: 'Matches', value: '104', sub: 'across the event', icon: '🏟️' },
  { label: 'Host Cities', value: '16', sub: '3 nations', icon: '🏙️' },
  { label: 'Venues', value: '16', sub: 'stadiums', icon: '🏟️' },
  { label: 'Final', value: 'Jul 19', sub: 'MetLife Stadium', icon: '🏆' },
];

const StatsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Tournament Stats
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Tournament Stats</h1>
        <p className="text-white/40">Live statistics will go live once the 2026 World Cup kicks off</p>
      </div>

      {/* Tournament facts grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {tournamentFacts.map((s) => (
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

      {/* Pre-tournament notice */}
      <div className="bg-gradient-to-br from-[#003087]/30 to-[#c8102e]/20 border border-white/10 rounded-2xl p-10 md:p-14 text-center">
        <div className="text-6xl mb-4">⚽</div>
        <h2 className="text-white font-black text-2xl md:text-3xl mb-3">The tournament hasn't kicked off yet</h2>
        <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
          The 2026 FIFA World Cup begins on <strong className="text-white/80">June 11, 2026</strong>.
          Top scorers, assists, team performance and tournament totals will appear here live as matches are played.
        </p>
      </div>

      {/* Advanced analytics placeholder */}
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
                  style={{ height: `${(j + 1) * 18}%` }}
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
