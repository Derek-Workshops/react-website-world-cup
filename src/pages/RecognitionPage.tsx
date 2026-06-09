import React from 'react';
import { recognitions, practiceStats } from '../data/mockData';

const RecognitionPage: React.FC = () => {
  return (
    <div>
      <section className="bg-[#0a1f3d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#b08d57] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Market Standing
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Recognition</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Our work in the region is consistently recognized by the leading legal directories.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {practiceStats.map((s) => (
            <div key={s.label} className="text-center border border-[#0a1f3d]/10 rounded-sm py-6 bg-white">
              <div className="font-serif text-3xl text-[#0a1f3d]">{s.value}</div>
              <div className="text-[#3a4456] text-xs mt-1 leading-snug px-2">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-3xl text-[#0a1f3d] mb-8">Rankings &amp; Reviews</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {recognitions.map((r) => (
            <div key={r.source} className="bg-white border border-[#0a1f3d]/10 rounded-sm p-8">
              <div className="text-[#b08d57] text-4xl font-serif leading-none mb-3">&ldquo;</div>
              <p className="text-[#0a1f3d] text-lg font-serif leading-relaxed mb-5">{r.quote}</p>
              <div className="flex items-center justify-between border-t border-[#0a1f3d]/10 pt-4">
                <span className="font-semibold text-[#0a1f3d] text-sm">{r.source}</span>
                <span className="text-xs uppercase tracking-wider text-[#b08d57]">{r.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecognitionPage;
