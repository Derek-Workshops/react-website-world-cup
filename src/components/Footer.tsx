import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050510] border-t border-[#f5a623]/20 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏆</span>
              <div>
                <div className="text-[#f5a623] font-bold text-lg">FIFA WORLD CUP</div>
                <div className="text-white/60 text-xs tracking-widest uppercase">USA · Canada · Mexico 2026</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              The world's greatest sporting event returns to North America.
              48 teams. 104 matches. One champion.
            </p>
            <div className="flex gap-4 mt-5">
              {['𝕏', 'f', 'in', '▶'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f5a623]/20 hover:text-[#f5a623] text-white/60 text-sm font-bold flex items-center justify-center transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[#f5a623] font-bold text-sm uppercase tracking-widest mb-4">Tournament</h4>
            <ul className="space-y-2">
              {['Groups', 'Schedule', 'Results', 'Standings', 'Knockout Stage'].map((item) => (
                <li key={item}>
                  <button className="text-white/50 hover:text-white text-sm transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Host info */}
          <div>
            <h4 className="text-[#f5a623] font-bold text-sm uppercase tracking-widest mb-4">Host Cities</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                { city: 'New York/New Jersey', flag: '🇺🇸' },
                { city: 'Los Angeles', flag: '🇺🇸' },
                { city: 'Mexico City', flag: '🇲🇽' },
                { city: 'Toronto', flag: '🇨🇦' },
                { city: 'Dallas', flag: '🇺🇸' },
              ].map(({ city, flag }) => (
                <li key={city} className="flex items-center gap-2">
                  <span>{flag}</span>
                  <span>{city}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © 2026 FIFA World Cup Demo Template. Built to showcase Devin AI.
          </p>
          <p className="text-white/30 text-xs">
            Group draw &amp; fixtures from the official 2026 tournament schedule.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
