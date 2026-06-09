import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons for webpack/CRA
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Venue {
  name: string;
  city: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  capacity: string;
}

const venues: Venue[] = [
  { name: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 40.8128, lng: -74.0742, capacity: '82,500' },
  { name: 'SoFi Stadium', city: 'Inglewood, CA', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 33.9535, lng: -118.3392, capacity: '70,240' },
  { name: 'AT&T Stadium', city: 'Arlington, TX', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 32.7473, lng: -97.0945, capacity: '80,000' },
  { name: 'Hard Rock Stadium', city: 'Miami Gardens, FL', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 25.9580, lng: -80.2389, capacity: '64,767' },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta, GA', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 33.7553, lng: -84.4006, capacity: '71,000' },
  { name: 'Lumen Field', city: 'Seattle, WA', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 47.5952, lng: -122.3316, capacity: '68,740' },
  { name: 'Lincoln Financial Field', city: 'Philadelphia, PA', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 39.9008, lng: -75.1675, capacity: '69,176' },
  { name: 'Gillette Stadium', city: 'Foxborough, MA', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 42.0909, lng: -71.2643, capacity: '65,878' },
  { name: 'NRG Stadium', city: 'Houston, TX', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 29.6847, lng: -95.4107, capacity: '72,220' },
  { name: 'GEHA Field at Arrowhead Stadium', city: 'Kansas City, MO', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 39.0489, lng: -94.4839, capacity: '76,416' },
  { name: "Levi's Stadium", city: 'Santa Clara, CA', country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', lat: 37.4033, lng: -121.9694, capacity: '68,500' },
  { name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}', lat: 19.3029, lng: -99.1505, capacity: '87,523' },
  { name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}', lat: 25.6694, lng: -100.2456, capacity: '53,500' },
  { name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}', lat: 20.6822, lng: -103.4625, capacity: '49,850' },
  { name: 'BMO Field', city: 'Toronto, ON', country: 'Canada', flag: '\u{1F1E8}\u{1F1E6}', lat: 43.6332, lng: -79.4186, capacity: '30,000' },
  { name: 'BC Place', city: 'Vancouver, BC', country: 'Canada', flag: '\u{1F1E8}\u{1F1E6}', lat: 49.2768, lng: -123.1118, capacity: '54,500' },
];

const countryColors: Record<string, string> = {
  USA: '#003087',
  Mexico: '#006847',
  Canada: '#c8102e',
};

const FlyTo: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.flyTo(center, zoom, { duration: 1.2 });
  return null;
};

const VenuesPage: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [filterCountry, setFilterCountry] = useState('All');

  const filtered = filterCountry === 'All' ? venues : venues.filter(v => v.country === filterCountry);

  const mapCenter: [number, number] = selectedVenue
    ? [selectedVenue.lat, selectedVenue.lng]
    : [37.0, -98.0];
  const mapZoom = selectedVenue ? 12 : 4;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          16 Stadiums
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Match Venues</h1>
        <p className="text-white/40 max-w-xl mx-auto">
          Explore the stadiums hosting the 2026 FIFA World Cup across the United States, Mexico, and Canada.
        </p>
      </div>

      {/* Country filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['All', 'USA', 'Mexico', 'Canada'].map((c) => (
          <button
            key={c}
            onClick={() => { setFilterCountry(c); setSelectedVenue(null); }}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
              filterCountry === c
                ? 'bg-[#f5a623] text-[#0a0a1a]'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {c === 'All' ? 'All Countries' : c}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-white/10 mb-8" style={{ height: '500px' }}>
        <MapContainer
          center={[37.0, -98.0]}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <FlyTo center={mapCenter} zoom={mapZoom} />
          {filtered.map((venue) => (
            <Marker
              key={venue.name}
              position={[venue.lat, venue.lng]}
              eventHandlers={{ click: () => setSelectedVenue(venue) }}
            >
              <Popup>
                <div style={{ color: '#0a0a1a', minWidth: '180px' }}>
                  <strong style={{ fontSize: '14px' }}>{venue.name}</strong>
                  <br />
                  <span style={{ fontSize: '12px' }}>{venue.flag} {venue.city}, {venue.country}</span>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>Capacity: {venue.capacity}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Venue cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((venue) => (
          <button
            key={venue.name}
            onClick={() => setSelectedVenue(venue)}
            className={`text-left bg-white/5 border rounded-2xl p-5 transition-all duration-200 hover:bg-white/[0.08] ${
              selectedVenue?.name === venue.name
                ? 'border-[#f5a623] bg-white/[0.08]'
                : 'border-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{venue.flag}</span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${countryColors[venue.country] || '#333'}20`,
                  color: countryColors[venue.country] || '#999',
                }}
              >
                {venue.country}
              </span>
            </div>
            <h3 className="text-white font-bold text-sm mb-1">{venue.name}</h3>
            <p className="text-white/40 text-xs">{venue.city}</p>
            <p className="text-[#f5a623] text-xs font-semibold mt-2">Capacity: {venue.capacity}</p>
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="mt-12 bg-[#003087]/20 border border-[#003087]/40 rounded-2xl p-6 text-center">
        <p className="text-white/60 text-sm">
          16 stadiums across 3 countries. Click a venue card or map marker to zoom in.
        </p>
      </div>
    </div>
  );
};

export default VenuesPage;
