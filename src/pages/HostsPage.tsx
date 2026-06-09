import React from 'react';
import { hosts } from '../data/mockData';

const HostsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-lime-400/10 border border-lime-400/30 rounded-full px-4 py-1.5 text-lime-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Meet the Crew
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Your Hosts</h1>
        <p className="text-white/40 max-w-xl mx-auto">
          Three tennis nerds who turned their courtside arguments into a weekly podcast.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hosts.map((host) => (
          <div
            key={host.name}
            className="bg-gradient-to-br from-court-green to-court-dark border border-white/10 hover:border-lime-400/40 rounded-3xl p-8 text-center transition-all duration-200"
          >
            <div className="text-7xl mb-4">{host.emoji}</div>
            <h3 className="text-white font-bold text-xl">{host.name}</h3>
            <p className="text-lime-400 text-sm font-semibold mb-4">{host.role}</p>
            <p className="text-white/60 text-sm mb-5">{host.bio}</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-left">
              <p className="text-[11px] uppercase tracking-widest text-lime-400 font-bold mb-1">
                Fun fact
              </p>
              <p className="text-white/70 text-sm">{host.funFact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostsPage;
