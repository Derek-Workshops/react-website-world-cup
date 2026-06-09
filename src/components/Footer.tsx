import React from 'react';
import { offices } from '../data/mockData';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0a1f3d] border-t border-[#b08d57]/30 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-sm border border-[#b08d57] text-[#b08d57] font-serif font-bold flex items-center justify-center text-sm">
                ST
              </span>
              <div>
                <div className="text-white font-serif text-lg">Simpson Thacher &amp; Bartlett LLP</div>
                <div className="text-[#b08d57] text-[10px] tracking-[0.28em] uppercase">Latin America Practice</div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm">
              A market-leading practice advising on the most significant cross-border
              transactions and disputes across Latin America.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[#b08d57] font-semibold text-xs uppercase tracking-widest mb-4">Practice</h4>
            <ul className="space-y-2">
              {[
                { id: 'practices', label: 'Practice Areas' },
                { id: 'experience', label: 'Experience' },
                { id: 'team', label: 'Our Team' },
                { id: 'recognition', label: 'Recognition' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-[#b08d57] font-semibold text-xs uppercase tracking-widest mb-4">Offices</h4>
            <ul className="space-y-2 text-sm text-white/55">
              {offices.map(({ city, flag }) => (
                <li key={city} className="flex items-center gap-2">
                  <span>{flag}</span>
                  <span>{city}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col gap-3">
          <p className="text-white/35 text-xs leading-relaxed max-w-3xl">
            This is an illustrative demonstration site and is not affiliated with, nor
            endorsed by, Simpson Thacher &amp; Bartlett LLP. All names, figures and
            representative matters shown are placeholder content for demonstration purposes only.
          </p>
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} · Demo template built to showcase Devin AI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
