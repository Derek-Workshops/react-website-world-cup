import React from 'react';
import { prizes, scoringRules } from '../../data/prizes';

const PrizeBoard: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-6">
    {/* Prizes */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-black text-xl mb-4">🏆 Prizes</h3>
      <ul className="space-y-3">
        {prizes.map((p) => (
          <li key={p.rank} className="flex items-center gap-3">
            <span className="text-2xl">{p.medal}</span>
            <div className="flex-1">
              <div className="text-white font-semibold text-sm">{p.title}</div>
              <div className="text-white/50 text-xs">{p.reward}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Scoring */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-black text-xl mb-4">📋 How scoring works</h3>
      <ul className="space-y-3">
        {scoringRules.map((r) => (
          <li key={r.label} className="flex items-center justify-between">
            <span className="text-white/70 text-sm">{r.label}</span>
            <span className="text-[#f5a623] font-bold text-sm tabular-nums">+{r.points} pts</span>
          </li>
        ))}
      </ul>
      <p className="text-white/40 text-xs mt-4">
        Points are awarded automatically once each match finishes. Highest total at the end of the
        tournament wins.
      </p>
    </div>
  </div>
);

export default PrizeBoard;
