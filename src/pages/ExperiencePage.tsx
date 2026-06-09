import React from 'react';
import { matters } from '../data/mockData';

const ExperiencePage: React.FC = () => {
  return (
    <div>
      <section className="bg-[#0a1f3d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#b08d57] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Track Record
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Representative Matters</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            A selection of recent engagements illustrating the breadth of our work across the region.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative border-l-2 border-[#b08d57]/30 ml-3">
          {matters.map((m) => (
            <div key={m.id} className="relative pl-8 pb-10 last:pb-0">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#b08d57] border-4 border-[#f7f5f0]" />
              <div className="bg-white border border-[#0a1f3d]/10 rounded-sm p-6">
                <div className="flex items-center gap-2 text-sm text-[#3a4456] mb-2">
                  <span className="font-serif text-[#b08d57] text-lg">{m.year}</span>
                  <span className="text-[#b08d57]">·</span>
                  <span className="text-lg">{m.flag}</span>
                  <span>{m.country}</span>
                </div>
                <h2 className="font-serif text-xl text-[#0a1f3d] mb-2">{m.headline}</h2>
                <p className="text-[#3a4456] leading-relaxed mb-3">{m.description}</p>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#0a1f3d] bg-[#b08d57]/15 rounded-full px-3 py-1">
                  {m.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExperiencePage;
