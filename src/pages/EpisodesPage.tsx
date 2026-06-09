import React, { useState } from 'react';
import { episodes, Episode } from '../data/mockData';
import AudioPlayer from '../components/AudioPlayer';

const allTags = ['All', ...Array.from(new Set(episodes.flatMap((e) => e.tags)))];

const EpisodeCard: React.FC<{ episode: Episode }> = ({ episode }) => (
  <div className="bg-white/5 border border-white/10 hover:border-lime-400/40 rounded-2xl p-6 transition-all duration-200">
    <div className="flex gap-5">
      <div className="text-5xl shrink-0">{episode.guestEmoji}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 text-xs">
          <span className="text-lime-400 font-bold">EP {episode.number}</span>
          <span className="text-white/30">•</span>
          <span className="text-white/40">{episode.date}</span>
          <span className="text-white/30">•</span>
          <span className="text-white/40">{episode.duration}</span>
        </div>
        <h3 className="text-white font-bold text-lg mb-2">{episode.title}</h3>
        <p className="text-white/50 text-sm mb-3">{episode.description}</p>
        <div className="flex items-center gap-2 mb-4 text-xs text-white/40">
          <span>🎤</span>
          <span>Guest: {episode.guest}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {episode.tags.map((tag) => (
              <span
                key={tag}
                className="bg-lime-400/10 text-lime-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <AudioPlayer src={episode.audioUrl} compact />
        </div>
      </div>
    </div>
  </div>
);

const EpisodesPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState('All');

  const filtered =
    activeTag === 'All'
      ? episodes
      : episodes.filter((e) => e.tags.includes(activeTag));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-lime-400/10 border border-lime-400/30 rounded-full px-4 py-1.5 text-lime-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          All Episodes
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">The Episode Library</h1>
        <p className="text-white/40">Every conversation from the Break Point archive.</p>
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              activeTag === tag
                ? 'bg-lime-400 text-court-dark'
                : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Episode list */}
      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white/30 py-16">No episodes with this tag yet.</p>
      )}
    </div>
  );
};

export default EpisodesPage;
