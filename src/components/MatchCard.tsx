import React from 'react';
import { Match } from '../data/mockData';

const MatchCard: React.FC<{ match: Match; isResult?: boolean }> = ({ match, isResult = false }) => (
  <div className="bg-white/5 border border-white/10 hover:border-[#f5a623]/40 rounded-2xl p-5 transition-all duration-200">
    <div className="flex justify-between items-center mb-4">
      <span className="text-xs text-[#f5a623] font-bold uppercase tracking-widest">{match.stage}</span>
      <div className="text-right">
        <div className="text-xs text-white/60 font-medium">{match.date}</div>
        <div className="text-xs text-white/30">{match.time} local</div>
      </div>
    </div>

    <div className="flex items-center gap-4">
      {/* Home */}
      <div className="flex-1 flex flex-col items-center gap-2">
        <span className="text-5xl">{match.homeFlag}</span>
        <span className="text-white font-semibold text-sm text-center">{match.homeTeam}</span>
      </div>

      {/* Score / VS */}
      <div className="flex flex-col items-center gap-1 min-w-[80px]">
        {isResult ? (
          <div className="bg-[#003087] rounded-xl px-4 py-2 text-white font-black text-2xl tabular-nums text-center">
            {match.homeScore} – {match.awayScore}
          </div>
        ) : (
          <div className="bg-white/10 rounded-xl px-4 py-2">
            <span className="text-white/60 font-bold text-sm">VS</span>
          </div>
        )}
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isResult ? 'bg-green-500/20 text-green-400' : 'bg-[#f5a623]/20 text-[#f5a623]'}`}>
          {isResult ? 'FT' : 'Upcoming'}
        </span>
      </div>

      {/* Away */}
      <div className="flex-1 flex flex-col items-center gap-2">
        <span className="text-5xl">{match.awayFlag}</span>
        <span className="text-white font-semibold text-sm text-center">{match.awayTeam}</span>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-white/40">
      <span>🏟️</span>
      <span className="truncate">{match.venue}</span>
    </div>
  </div>
);

export default MatchCard;
