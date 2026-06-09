import React, { useState } from 'react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'practices', label: 'Practice Areas' },
  { id: 'experience', label: 'Experience' },
  { id: 'team', label: 'Our Team' },
  { id: 'recognition', label: 'Recognition' },
];

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1f3d]/95 backdrop-blur border-b border-[#b08d57]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-left"
          >
            <span className="w-9 h-9 rounded-sm border border-[#b08d57] text-[#b08d57] font-serif font-bold flex items-center justify-center text-sm tracking-tight">
              ST
            </span>
            <div>
              <div className="text-white font-serif text-base leading-tight tracking-wide">
                Simpson Thacher <span className="text-white/50 font-sans text-xs">&amp; Bartlett</span>
              </div>
              <div className="text-[#b08d57] text-[10px] tracking-[0.28em] uppercase">
                Latin America Practice
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3.5 py-2 rounded-md text-sm transition-all duration-200 ${
                  activePage === link.id
                    ? 'text-[#b08d57] font-semibold'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => onNavigate('team')}
              className="border border-[#b08d57] text-[#b08d57] hover:bg-[#b08d57] hover:text-[#0a1f3d] px-5 py-2 rounded-sm text-sm font-semibold tracking-wide transition-colors duration-200"
            >
              Contact Us
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
        <div className="md:hidden border-t border-[#b08d57]/20 bg-[#0a1f3d]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 rounded-md text-sm transition-colors ${
                  activePage === link.id
                    ? 'text-[#b08d57] font-semibold'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { onNavigate('team'); setMenuOpen(false); }}
              className="w-full mt-2 border border-[#b08d57] text-[#b08d57] px-4 py-2.5 rounded-sm text-sm font-semibold"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
