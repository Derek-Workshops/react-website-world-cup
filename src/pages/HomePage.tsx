import React from 'react';
import { practiceStats, practiceAreas, matters, jurisdictions } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #07172e 0%, #0a1f3d 55%, #102a4f 100%)',
        }}
      >
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#b08d57]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-[#16335f]/40 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="inline-block border border-[#b08d57]/40 rounded-sm px-4 py-1.5 text-[#b08d57] text-xs font-semibold uppercase tracking-[0.3em] mb-8">
              Latin America Practice Group
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] mb-6">
              Trusted counsel for the region&rsquo;s most
              <span className="text-[#b08d57]"> significant transactions</span>
            </h1>

            <p className="text-white/65 text-lg leading-relaxed max-w-2xl mb-10">
              For more than three decades, Simpson Thacher has advised leading
              corporations, financial institutions and investors on landmark M&amp;A,
              capital markets, financing and dispute matters across Latin America.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('practices')}
                className="bg-[#b08d57] hover:bg-[#9a7846] text-[#0a1f3d] font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200"
              >
                Explore Practice Areas
              </button>
              <button
                onClick={() => onNavigate('experience')}
                className="border border-white/25 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200"
              >
                Representative Matters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats strip ─── */}
      <section className="bg-[#0a1f3d] border-y border-[#b08d57]/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {practiceStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl text-[#b08d57]">{stat.value}</div>
                <div className="text-white/55 text-xs mt-1 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Overview ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[#b08d57] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              The Practice
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0a1f3d] leading-tight">
              A single, integrated team across the Americas
            </h2>
          </div>
          <div className="text-[#3a4456] leading-relaxed space-y-4">
            <p>
              Our Latin America practice brings together lawyers in New York, São Paulo
              and Washington, D.C. to deliver seamless, cross-border advice. We combine
              deep regional knowledge with the full strength of a leading global firm.
            </p>
            <p>
              From multibillion-dollar acquisitions and international offerings to complex
              financings and high-stakes arbitration, clients turn to us for the matters
              that define markets.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Practice areas preview ─── */}
      <section className="bg-white border-y border-[#0a1f3d]/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#b08d57] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
                What We Do
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0a1f3d]">Practice Areas</h2>
            </div>
            <button
              onClick={() => onNavigate('practices')}
              className="hidden sm:inline text-[#0a1f3d] hover:text-[#b08d57] text-sm font-semibold transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.slice(0, 6).map((area) => (
              <div
                key={area.id}
                className="border border-[#0a1f3d]/10 rounded-sm p-6 hover:border-[#b08d57] hover:shadow-md transition-all duration-200 bg-[#f7f5f0]/40"
              >
                <div className="text-3xl mb-3">{area.icon}</div>
                <h3 className="font-serif text-xl text-[#0a1f3d] mb-2">{area.name}</h3>
                <p className="text-[#3a4456] text-sm leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured matters ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-[#b08d57] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
          Selected Highlights
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#0a1f3d] mb-10">Recent Matters</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {matters.slice(0, 3).map((m) => (
            <div key={m.id} className="border-t-2 border-[#b08d57] pt-5">
              <div className="flex items-center gap-2 text-sm text-[#3a4456] mb-3">
                <span className="text-lg">{m.flag}</span>
                <span>{m.country}</span>
                <span className="text-[#b08d57]">·</span>
                <span>{m.year}</span>
              </div>
              <h3 className="font-serif text-lg text-[#0a1f3d] mb-2">{m.headline}</h3>
              <p className="text-[#3a4456] text-sm leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Regional reach ─── */}
      <section className="bg-[#0a1f3d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#b08d57] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Regional Reach
          </p>
          <h2 className="font-serif text-3xl text-white mb-8">
            Active across the region&rsquo;s key markets
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {jurisdictions.map((j) => (
              <span
                key={j.name}
                className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-2 text-white/80 text-sm"
              >
                <span>{j.flag}</span>
                {j.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="border border-[#0a1f3d]/15 rounded-sm p-10 md:p-16 text-center bg-white">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0a1f3d] mb-4">
            Discuss your matter with our team
          </h2>
          <p className="text-[#3a4456] text-lg mb-8 max-w-xl mx-auto">
            Connect with the lawyers who lead our Latin America practice across New York
            and São Paulo.
          </p>
          <button
            onClick={() => onNavigate('team')}
            className="bg-[#0a1f3d] hover:bg-[#102a4f] text-white font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200"
          >
            Meet the Team
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
