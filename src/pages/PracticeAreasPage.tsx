import React from 'react';
import { practiceAreas } from '../data/mockData';

const PageHeader: React.FC<{ eyebrow: string; title: string; subtitle: string }> = ({
  eyebrow,
  title,
  subtitle,
}) => (
  <section className="bg-[#0a1f3d] py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-[#b08d57] text-xs font-semibold uppercase tracking-[0.3em] mb-3">{eyebrow}</p>
      <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">{title}</h1>
      <p className="text-white/60 text-lg max-w-2xl">{subtitle}</p>
    </div>
  </section>
);

const PracticeAreasPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        eyebrow="What We Do"
        title="Practice Areas"
        subtitle="Comprehensive, cross-border capabilities spanning the full life cycle of investments and disputes in Latin America."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {practiceAreas.map((area) => (
            <div
              key={area.id}
              className="bg-white border border-[#0a1f3d]/10 rounded-sm p-8 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{area.icon}</span>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-[#0a1f3d] mb-2">{area.name}</h2>
                  <p className="text-[#3a4456] leading-relaxed mb-4">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs text-[#0a1f3d] bg-[#b08d57]/15 border border-[#b08d57]/30 rounded-full px-3 py-1"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PracticeAreasPage;
