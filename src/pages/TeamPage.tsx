import React from 'react';
import { lawyers, offices } from '../data/mockData';

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');

const TeamPage: React.FC = () => {
  return (
    <div>
      <section className="bg-[#0a1f3d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#b08d57] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Key Contacts
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Team</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Partners who lead our Latin America practice across New York and São Paulo.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lawyers.map((l) => (
            <div
              key={l.id}
              className="bg-white border border-[#0a1f3d]/10 rounded-sm p-6 text-center hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-[#0a1f3d] text-[#b08d57] font-serif text-2xl flex items-center justify-center mb-4">
                {initials(l.name)}
              </div>
              <h2 className="font-serif text-xl text-[#0a1f3d]">{l.name}</h2>
              <p className="text-[#b08d57] text-sm font-semibold mb-3">{l.title}</p>
              <div className="text-[#3a4456] text-sm space-y-1">
                <p>{l.focus}</p>
                <p className="text-[#3a4456]/70">{l.office} · {l.languages}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offices */}
      <section className="bg-white border-t border-[#0a1f3d]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#b08d57] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl text-[#0a1f3d] mb-8">Offices Serving the Region</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((o) => (
              <div key={o.city} className="border border-[#0a1f3d]/10 rounded-sm p-6">
                <div className="text-2xl mb-2">{o.flag}</div>
                <h3 className="font-serif text-lg text-[#0a1f3d]">{o.city}</h3>
                <p className="text-[#3a4456] text-sm">{o.country}</p>
                <p className="text-[#b08d57] text-xs mt-2 uppercase tracking-wide">{o.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
