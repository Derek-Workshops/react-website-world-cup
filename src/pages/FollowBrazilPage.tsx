import React from 'react';
import { brazilRoadToFinal, RoadStep } from '../data/mockData';

const stageAccent: Record<string, string> = {
  'Round of 32': '#14b8a6',
  'Round of 16': '#22c55e',
  'Quarter-final': '#eab308',
  'Semi-final': '#f97316',
  Final: '#f5a623',
};

const RoadCard: React.FC<{ step: RoadStep; index: number; isLast: boolean }> = ({ step, index, isLast }) => {
  const accent = stageAccent[step.stage] ?? '#22c55e';
  const isFinal = step.stage === 'Final';

  return (
    <div className="relative pl-12 pb-10">
      {/* Connector line */}
      {!isLast && <div className="absolute left-[18px] top-10 bottom-0 w-0.5 bg-white/10" />}

      {/* Step number dot */}
      <div
        className="absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-[#0a0a1a] z-10"
        style={{ background: accent }}
      >
        {index + 1}
      </div>

      <div
        className={`rounded-2xl p-6 border transition-all duration-200 ${
          isFinal
            ? 'bg-gradient-to-br from-[#009739]/20 to-[#fedd00]/10 border-[#fedd00]/40'
            : 'bg-white/5 border-white/10 hover:border-white/25'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: `${accent}22`, color: accent }}
          >
            {isFinal ? '🏆 ' : ''}{step.stage}
          </span>
          <span className="text-sm text-white/60 font-medium">
            {step.date} · {step.time}
          </span>
        </div>

        {/* Matchup */}
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <div className="flex flex-col items-center gap-2 flex-1">
            <span className="text-5xl">🇧🇷</span>
            <span className="text-white font-bold text-sm">Brazil</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="bg-white/10 rounded-xl px-4 py-2 text-white/60 font-bold text-sm">VS</span>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <span className="text-5xl">{step.opponentFlag}</span>
            <span className="text-white font-bold text-sm text-center">{step.opponent}</span>
            <span className="text-[11px] text-white/40 text-center">{step.opponentNote}</span>
          </div>
        </div>

        {/* Venue */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-white/50">
          <span>🏟️</span>
          <span>{step.stadium} — {step.city} {step.flag}</span>
        </div>
      </div>
    </div>
  );
};

const FollowBrazilPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    {/* Header */}
    <div className="text-center mb-10">
      <div className="inline-block bg-[#009739]/15 border border-[#009739]/40 rounded-full px-4 py-1.5 text-[#fedd00] text-xs font-bold uppercase tracking-[0.3em] mb-4">
        🇧🇷 Road to the Final
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Follow Brazil</h1>
      <p className="text-white/50 max-w-xl mx-auto">
        Brazil's projected path to glory — assuming they finish first in Group C and keep winning all
        the way to the final.
      </p>
    </div>

    {/* Assumption note */}
    <div className="bg-[#fedd00]/10 border border-[#fedd00]/30 rounded-xl px-5 py-4 mb-12 text-sm text-white/70">
      <span className="font-bold text-[#fedd00]">Heads up:</span> Opponents below are projections based on
      the current group standings and will change depending on other results. Dates and host stadiums
      reflect the 2026 knockout schedule.
    </div>

    {/* Timeline */}
    <div>
      {brazilRoadToFinal.map((step, i) => (
        <RoadCard
          key={step.stage}
          step={step}
          index={i}
          isLast={i === brazilRoadToFinal.length - 1}
        />
      ))}
    </div>

    {/* Champions banner */}
    <div
      className="rounded-2xl p-8 text-center mt-2"
      style={{ background: 'linear-gradient(135deg, #009739, #fedd00)' }}
    >
      <span className="text-5xl block mb-2">🏆</span>
      <h2 className="text-2xl md:text-3xl font-black text-[#0a0a1a]">
        Win it all — Champions, July 19
      </h2>
      <p className="text-[#0a0a1a]/70 text-sm mt-1">
        Lift the trophy at MetLife Stadium, New York / New Jersey
      </p>
    </div>
  </div>
);

export default FollowBrazilPage;
