import React, { useState } from 'react';
import { platforms, showStats, showName } from '../data/mockData';

const AboutPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-lime-400/10 border border-lime-400/30 rounded-full px-4 py-1.5 text-lime-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          About the Show
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">What is {showName}?</h1>
      </div>

      {/* Story */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 mb-10 space-y-4 text-white/70 leading-relaxed">
        <p>
          <span className="text-white font-semibold">{showName}</span> is a weekly
          tennis podcast for fans who love the sport beyond the scoreline. Every
          episode we dig into technique, tactics, the tour, and the personalities
          that make tennis the most dramatic sport on the planet.
        </p>
        <p>
          From Grand Slam breakdowns to deep dives with coaches, players, and
          analysts, we keep it smart, honest, and fun. Whether you grew up
          watching the greats or just picked up a racquet last summer, there is a
          seat for you courtside.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        {showStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-lime-400 font-black text-2xl">{stat.value}</div>
            <div className="text-white/40 text-xs uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Subscribe */}
      <div className="bg-gradient-to-br from-court-green to-court-dark border border-lime-400/20 rounded-3xl p-8 md:p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
          Get every episode first
        </h2>
        <p className="text-white/60 mb-6">
          Join the newsletter for new episodes, bonus content, and listener Q&amp;As.
        </p>

        {subscribed ? (
          <p className="text-lime-400 font-bold">
            🎾 You are on the list! Game, set, match.
          </p>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder-white/40 focus:outline-none focus:border-lime-400"
            />
            <button
              type="submit"
              className="bg-lime-400 hover:bg-lime-300 text-court-dark font-bold px-6 py-3 rounded-full transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}

        <div className="mt-8">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Or listen on</p>
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
    </div>
  );
};

export default AboutPage;
