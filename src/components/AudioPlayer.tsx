import React, { useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  compact?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, compact = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      void audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause episode' : 'Play episode'}
        className={`flex items-center justify-center rounded-full bg-lime-400 text-court-dark hover:bg-lime-300 transition-colors shadow-lg shadow-lime-400/20 ${
          compact ? 'w-10 h-10 text-base' : 'w-14 h-14 text-xl'
        }`}
      >
        {playing ? '⏸' : '▶'}
      </button>
      {!compact && (
        <span className="text-white/50 text-sm">
          {playing ? 'Now playing…' : 'Listen now'}
        </span>
      )}
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setPlaying(false)}
        preload="none"
      />
    </div>
  );
};

export default AudioPlayer;
