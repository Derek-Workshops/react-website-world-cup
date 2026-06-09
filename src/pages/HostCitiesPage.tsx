import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { hostCities, HostCity } from '../data/hostCities';

// Gold map pin built from HTML so we don't depend on Leaflet's default marker
// image assets (which break under the Create React App / webpack build).
const pinIcon = L.divIcon({
  className: '',
  html:
    '<div style="width:18px;height:18px;border-radius:50% 50% 50% 0;background:#f5a623;border:2px solid #fff;transform:rotate(-45deg);box-shadow:0 0 6px rgba(0,0,0,0.5)"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 18],
  popupAnchor: [0, -18],
});

const COUNTRY_ORDER: HostCity['country'][] = ['USA', 'Canada', 'Mexico'];

const HostCitiesPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markers = useRef<Record<string, L.Marker>>({});
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [37, -97],
      zoom: 4,
      scrollWheelZoom: false,
    });
    mapInstance.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    hostCities.forEach((c) => {
      const marker = L.marker([c.lat, c.lng], { icon: pinIcon })
        .addTo(map)
        .bindPopup(
          `<strong>${c.stadium}</strong><br/>${c.flag} ${c.city}<br/>Capacity: ${c.capacity.toLocaleString()}`
        );
      marker.on('click', () => setSelected(c.city));
      markers.current[c.city] = marker;
    });

    // Fit the map to all venues.
    const bounds = L.latLngBounds(hostCities.map((c) => [c.lat, c.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });

    return () => {
      map.remove();
      mapInstance.current = null;
      markers.current = {};
    };
  }, []);

  const focusCity = (city: HostCity) => {
    const map = mapInstance.current;
    const marker = markers.current[city.city];
    if (!map || !marker) return;
    setSelected(city.city);
    map.flyTo([city.lat, city.lng], 11, { duration: 1 });
    marker.openPopup();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Host Cities
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Where the Games Take Place</h1>
        <p className="text-white/40">
          16 stadiums across the United States, Canada, and Mexico
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div
            ref={mapRef}
            className="h-[420px] sm:h-[560px] w-full rounded-2xl overflow-hidden border border-white/10 z-0"
          />
          <p className="text-white/30 text-xs mt-2 text-center">
            Tap a pin or a city to see its stadium. Map data © OpenStreetMap.
          </p>
        </div>

        {/* City list */}
        <div className="lg:col-span-1 lg:max-h-[560px] lg:overflow-y-auto pr-1 space-y-5">
          {COUNTRY_ORDER.map((country) => {
            const cities = hostCities.filter((c) => c.country === country);
            return (
              <div key={country}>
                <h2 className="text-[#f5a623] font-bold text-sm uppercase tracking-widest mb-2">
                  {cities[0].flag} {country}
                  <span className="text-white/30 font-normal ml-2">{cities.length} cities</span>
                </h2>
                <div className="space-y-2">
                  {cities.map((c) => (
                    <button
                      key={c.city}
                      onClick={() => focusCity(c)}
                      className={`w-full text-left rounded-xl p-3 border transition-colors ${
                        selected === c.city
                          ? 'bg-[#f5a623]/15 border-[#f5a623]/50'
                          : 'bg-white/5 border-white/10 hover:border-[#f5a623]/40'
                      }`}
                    >
                      <div className="text-white font-semibold text-sm">{c.city}</div>
                      <div className="text-white/50 text-xs mt-0.5">{c.stadium}</div>
                      <div className="text-white/30 text-xs mt-0.5">
                        Capacity {c.capacity.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HostCitiesPage;
