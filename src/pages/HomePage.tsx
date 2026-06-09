import React from 'react';
import {
  episodes,
  platforms,
  showStats,
  showName,
  showTagline,
} from '../data/mockData';
import AudioPlayer from '../components/AudioPlayer';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const latest = episodes[0];
  const featured = episodes.slice(1, 4);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0b140d 0%, #16331f 50%, #0b140d 100%)',
        }}
      >
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-court-clay/15 rounded-full blur-3xl pointer-events-none" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-24">
          <div className="flex justify-center mb-6">
            <span className="text-8xl md:text-9xl drop-shadow-2xl">🎾</span>
          </div>

          <div className="inline-block bg-lime-400/10 border border-lime-400/30 rounded-full px-4 py-1.5 text-lime-400 text-xs font-bold uppercase tracking-[0.3em] mb-6">
            New episodes every week
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-none mb-4 tracking-tight">
            BREAK
            <span className="block text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #a3e635, #d9f99d, #a3e635)' }}>
              POINT
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {showTagline}. Honest analysis, legendary guests, and the stories
            behind every serve, volley, and match point.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => onNavigate('episodes')}
              className="bg-lime-400 hover:bg-lime-300 text-court-dark font-bold px-8 py-3.5 rounded-full transition-colors duration-200 shadow-lg shadow-lime-400/20"
            >
              Browse Episodes
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-full transition-colors duration-200 border border-white/20"
            >
              About the Show
            </button>
          </div>

          {/* Listen on */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Listen on</p>
            <div className="flex flex-wrap justify-center gap-2">
              {platforms.map((p) => (
                <span
                  key={p.name}
                  className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/70"
                >
                  <span>{p.icon}</span>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="bg-lime-400 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {showStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl mb-0.5">{stat.icon}</div>
                <div className="text-court-dark font-black text-lg leading-none">{stat.value}</div>
                <div className="text-court-dark/70 text-[10px] uppercase tracking-wider font-bold mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Latest Episode ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10">
          <div className="inline-block bg-lime-400/10 border border-lime-400/30 rounded-full px-4 py-1.5 text-lime-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Latest Episode
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">Fresh off the court</h2>
        </div>

        <div className="bg-gradient-to-br from-court-green to-court-dark border border-lime-400/20 rounded-3xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="text-7xl md:text-8xl shrink-0">{latest.guestEmoji}</div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-lime-400 text-sm font-bold mb-1">
                Episode {latest.number} · {latest.date} · {latest.duration}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{latest.title}</h3>
              <p className="text-white/60 mb-6 max-w-2xl">{latest.description}</p>
              <div className="flex justify-center md:justify-start">
                <AudioPlayer src={latest.audioUrl} />
              </div>
              {latest.credit && (
                <p className="text-white/30 text-[11px] mt-4">{latest.credit}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Episodes ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-white">More episodes</h2>
          <button
            onClick={() => onNavigate('episodes')}
            className="text-lime-400 hover:text-lime-300 text-sm font-bold"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((ep) => (
            <div
              key={ep.id}
              className="bg-white/5 border border-white/10 hover:border-lime-400/40 rounded-2xl p-6 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{ep.guestEmoji}</span>
                <span className="text-xs text-white/40 font-medium">EP {ep.number}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{ep.title}</h3>
              <p className="text-white/50 text-sm mb-4 line-clamp-3">{ep.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-xs">{ep.duration}</span>
                <AudioPlayer src={ep.audioUrl} compact />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Subscribe CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-court-clay rounded-3xl px-6 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Never miss a match point
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6">
            Subscribe to {showName} and get a new episode in your feed every single week.
          </p>
          <button
            onClick={() => onNavigate('about')}
            className="bg-court-dark hover:bg-black text-white font-bold px-8 py-3.5 rounded-full transition-colors"
          >
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
