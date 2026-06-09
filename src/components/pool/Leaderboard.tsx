import React from 'react';
import { LeaderboardEntry } from '../../utils/scoring';
import { prizes } from '../../data/prizes';

interface Props {
  entries: LeaderboardEntry[];
  currentUserId: string;
}

const medalFor = (rank: number) => prizes.find((p) => p.rank === rank)?.medal ?? '';

const Leaderboard: React.FC<Props> = ({ entries, currentUserId }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <h3 className="text-white font-black text-xl mb-4">🏅 Leaderboard</h3>

    {entries.length === 0 ? (
      <p className="text-white/40 text-sm py-6 text-center">
        No members yet. Be the first to join the pool!
      </p>
    ) : (
      <div className="space-y-1">
        <div className="grid grid-cols-[2rem_1fr_auto_auto] gap-3 px-3 pb-2 text-white/40 text-xs uppercase tracking-wider">
          <span>#</span>
          <span>Member</span>
          <span className="text-right">Exact</span>
          <span className="text-right">Points</span>
        </div>
        {entries.map((entry, i) => {
          const rank = i + 1;
          const isMe = entry.userId === currentUserId;
          return (
            <div
              key={entry.userId}
              className={`grid grid-cols-[2rem_1fr_auto_auto] gap-3 px-3 py-2.5 rounded-xl items-center ${
                isMe ? 'bg-[#f5a623]/15 border border-[#f5a623]/30' : 'bg-white/5'
              }`}
            >
              <span className="font-bold text-white/70">{medalFor(rank) || rank}</span>
              <span className="text-white text-sm font-medium truncate">
                {entry.name}
                {isMe && <span className="text-[#f5a623] text-xs ml-2">(you)</span>}
                <span className="block text-white/35 text-xs">{entry.predictionsMade} picks</span>
              </span>
              <span className="text-right text-white/60 text-sm tabular-nums">{entry.exact}</span>
              <span className="text-right text-[#f5a623] font-black tabular-nums">{entry.points}</span>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default Leaderboard;
