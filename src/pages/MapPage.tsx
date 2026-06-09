import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useFixtures } from '../hooks/useFixtures';
import { Fixture } from '../services/worldCupApi';
import { VENUES, Venue } from '../data/venues';
import { ErrorState } from '../components/MatchListState';

const FLAG: Record<Venue['country'], string> = { USA: '🇺🇸', Canada: '🇨🇦', Mexico: '🇲🇽' };

interface VenueGroup {
  venue: Venue;
  matches: Fixture[];
}

const makeIcon = (count: number): L.DivIcon =>
  L.divIcon({
    className: '',
    html: `<div style="
      background:#f5a623;color:#0a0a1a;font-weight:800;font-size:13px;
      width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      border:2px solid #0a0a1a;box-shadow:0 2px 6px rgba(0,0,0,0.5);">
      <span style="transform:rotate(45deg)">${count}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
    popupAnchor: [0, -28],
  });

const MapPage: React.FC = () => {
  const { fixtures, loading, error } = useFixtures();

  const venueGroups = useMemo<VenueGroup[]>(() => {
    const groups = new Map<string, VenueGroup>();
    fixtures.forEach((f) => {
      const venue = VENUES[f.venue];
      if (!venue) return;
      if (!groups.has(f.venue)) groups.set(f.venue, { venue, matches: [] });
      groups.get(f.venue)!.matches.push(f);
    });
    return Array.from(groups.values()).sort((a, b) => a.venue.city.localeCompare(b.venue.city));
  }, [fixtures]);

  const countByCountry = useMemo(() => {
    const counts: Record<string, number> = { USA: 0, Canada: 0, Mexico: 0 };
    venueGroups.forEach((g) => {
      counts[g.venue.country] += 1;
    });
    return counts;
  }, [venueGroups]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Host Venues
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Where the Games Are Played</h1>
        <p className="text-white/40 max-w-xl mx-auto">
          16 stadiums across the USA, Canada, and Mexico. Click a marker to see the matches at each venue.
        </p>
      </div>

      {/* Country summary */}
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
        {(['USA', 'Canada', 'Mexico'] as const).map((c) => (
          <div key={c} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">{FLAG[c]}</div>
            <div className="text-[#f5a623] font-black text-xl">{countByCountry[c] || 0}</div>
            <div className="text-white/40 text-xs">{c} venues</div>
          </div>
        ))}
      </div>

      {error && <div className="mb-6"><ErrorState message={error} /></div>}

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-white/10 mb-10">
        <MapContainer
          center={[39, -98]}
          zoom={3}
          scrollWheelZoom={false}
          style={{ height: '70vh', width: '100%', background: '#0a0a1a' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {venueGroups.map(({ venue, matches }) => (
            <Marker key={venue.name} position={[venue.lat, venue.lng]} icon={makeIcon(matches.length)}>
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>
                    {FLAG[venue.country]} {venue.name}
                  </div>
                  <div style={{ color: '#555', fontSize: 12, marginBottom: 6 }}>
                    {venue.city}, {venue.country} · {matches.length} matches
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', fontSize: 12 }}>
                    {matches.slice(0, 4).map((m) => (
                      <li key={m.id} style={{ borderTop: '1px solid #eee', padding: '3px 0' }}>
                        <strong>{m.date}</strong> — {m.homeTeam} vs {m.awayTeam}
                      </li>
                    ))}
                    {matches.length > 4 && (
                      <li style={{ paddingTop: 3, color: '#777' }}>+{matches.length - 4} more…</li>
                    )}
                  </ul>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Venue list */}
      <h2 className="text-2xl font-black text-white mb-5">All Host Stadiums</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {venueGroups.map(({ venue, matches }) => (
            <div
              key={venue.name}
              className="bg-white/5 border border-white/10 hover:border-[#f5a623]/40 rounded-2xl p-5 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white font-bold">{venue.name}</div>
                  <div className="text-white/40 text-sm mt-0.5">
                    {FLAG[venue.country]} {venue.city}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#f5a623] font-black text-xl">{matches.length}</div>
                  <div className="text-white/30 text-xs">matches</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapPage;
