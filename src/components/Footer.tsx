import React from 'react';
import { showName, platforms } from '../data/mockData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070d09] border-t border-lime-400/20 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎾</span>
              <div>
                <div className="text-lime-400 font-bold text-lg">{showName.toUpperCase()}</div>
                <div className="text-white/60 text-xs tracking-widest uppercase">The Tennis Podcast</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              New episodes every week. Honest tennis talk, expert guests, and
              the stories behind the sport we love.
            </p>
            <div className="flex gap-4 mt-5">
              {['𝕏', 'f', 'in', '▶'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-lime-400/20 hover:text-lime-400 text-white/60 text-sm font-bold flex items-center justify-center transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Show links */}
          <div>
            <h4 className="text-lime-400 font-bold text-sm uppercase tracking-widest mb-4">Show</h4>
            <ul className="space-y-2">
              {['Episodes', 'Hosts', 'About', 'Newsletter', 'Contact'].map((item) => (
                <li key={item}>
                  <button className="text-white/50 hover:text-white text-sm transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Listen on */}
          <div>
            <h4 className="text-lime-400 font-bold text-sm uppercase tracking-widest mb-4">Listen On</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {platforms.map(({ name, icon }) => (
                <li key={name} className="flex items-center gap-2">
                  <span>{icon}</span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © 2026 {showName}. A demo tennis podcast site built with Devin AI.
          </p>
          <p className="text-white/30 text-xs">
            All content is placeholder.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
