import React, { useState } from 'react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'groups', label: 'Groups' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'teams', label: 'Teams' },
  { id: 'stats', label: 'Stats' },
  { id: 'hostcities', label: 'Host Cities' },
];

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/95 backdrop-blur border-b border-[#f5a623]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <span className="text-3xl">🏆</span>
            <div className="text-left">
              <div className="text-[#f5a623] font-bold text-lg leading-tight tracking-wide">
                FIFA WORLD CUP
              </div>
              <div className="text-white/70 text-xs tracking-[0.2em] uppercase">
                USA · Canada · Mexico 2026
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activePage === link.id
                    ? 'bg-[#f5a623] text-[#0a0a1a] font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button className="bg-[#c8102e] hover:bg-[#a50d26] text-white px-5 py-2 rounded-full text-sm font-bold transition-colors duration-200 shadow-lg">
              Get Tickets
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#f5a623]/20 bg-[#0a0a1a]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activePage === link.id
                    ? 'bg-[#f5a623] text-[#0a0a1a] font-bold'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button className="w-full mt-2 bg-[#c8102e] text-white px-4 py-2.5 rounded-md text-sm font-bold">
              Get Tickets
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
