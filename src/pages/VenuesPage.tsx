import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { venues, Venue } from '../data/mockData';

const countryFilters = ['All', 'USA', 'Canada', 'Mexico'] as const;
type CountryFilter = (typeof countryFilters)[number];

const countryColor: Record<Venue['country'], string> = {
  USA: '#3b82f6',
  Canada: '#ef4444',
  Mexico: '#22c55e',
};

const makeIcon = (color: string) =>
  L.divIcon({
    className: '',
    html: `<div style="
      background:${color};
      width:18px;height:18px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:2px solid white;
      box-shadow:0 0 6px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 18],
    popupAnchor: [0, -18],
  });

const VenuesPage: React.FC = () => {
  const [activeCountry, setActiveCountry] = useState<CountryFilter>('All');

  const filtered = useMemo(
    () =>
      activeCountry === 'All'
        ? venues
        : venues.filter((v) => v.country === activeCountry),
    [activeCountry],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          16 Host Cities
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Venues</h1>
        <p className="text-white/40">
          Explore the stadiums across the USA, Canada, and Mexico where the 2026 matches will be played
        </p>
      </div>

      {/* Country filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {countryFilters.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCountry(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              activeCountry === c
                ? 'bg-[#f5a623] text-[#0a0a1a]'
                : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-white/10 mb-4">
        <MapContainer
          center={[39, -98]}
          zoom={3}
          scrollWheelZoom={false}
          style={{ height: '480px', width: '100%', background: '#0a0a1a' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((v) => (
            <Marker key={v.id} position={[v.lat, v.lng]} icon={makeIcon(countryColor[v.country])}>
              <Popup>
                <div style={{ minWidth: 160 }}>
                  <strong>{v.stadium}</strong>
                  <br />
                  {v.flag} {v.city}, {v.country}
                  <br />
                  Capacity: {v.capacity.toLocaleString()}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-5 mb-10 text-xs text-white/60">
        {(Object.keys(countryColor) as Venue['country'][]).map((country) => (
          <span key={country} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full border border-white/40"
              style={{ background: countryColor[country] }}
            />
            {country}
          </span>
        ))}
      </div>

      {/* Venue list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((v) => (
          <div
            key={v.id}
            className="bg-white/5 border border-white/10 hover:border-[#f5a623]/50 rounded-2xl p-5 transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-3xl">{v.flag}</span>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                style={{ background: `${countryColor[v.country]}22`, color: countryColor[v.country] }}
              >
                {v.country}
              </span>
            </div>
            <h3 className="text-white font-bold text-base leading-snug">{v.stadium}</h3>
            <p className="text-white/50 text-sm mt-1">📍 {v.city}</p>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/40">
              👥 Capacity {v.capacity.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenuesPage;
