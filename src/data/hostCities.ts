export interface HostCity {
  city: string;
  country: 'USA' | 'Canada' | 'Mexico';
  flag: string;
  stadium: string;
  capacity: number;
  lat: number;
  lng: number;
}

// The 16 official host cities/stadiums of the 2026 FIFA World Cup.
export const hostCities: HostCity[] = [
  { city: 'Mexico City', country: 'Mexico', flag: '🇲🇽', stadium: 'Estadio Azteca', capacity: 87523, lat: 19.3029, lng: -99.1505 },
  { city: 'Guadalajara', country: 'Mexico', flag: '🇲🇽', stadium: 'Estadio Akron', capacity: 48071, lat: 20.6818, lng: -103.4625 },
  { city: 'Monterrey', country: 'Mexico', flag: '🇲🇽', stadium: 'Estadio BBVA', capacity: 53500, lat: 25.6693, lng: -100.2444 },
  { city: 'Toronto', country: 'Canada', flag: '🇨🇦', stadium: 'BMO Field', capacity: 45000, lat: 43.6332, lng: -79.4185 },
  { city: 'Vancouver', country: 'Canada', flag: '🇨🇦', stadium: 'BC Place', capacity: 54500, lat: 49.2768, lng: -123.1119 },
  { city: 'Atlanta', country: 'USA', flag: '🇺🇸', stadium: 'Mercedes-Benz Stadium', capacity: 71000, lat: 33.7554, lng: -84.4009 },
  { city: 'Boston', country: 'USA', flag: '🇺🇸', stadium: 'Gillette Stadium', capacity: 65878, lat: 42.0909, lng: -71.2643 },
  { city: 'Dallas', country: 'USA', flag: '🇺🇸', stadium: 'AT&T Stadium', capacity: 80000, lat: 32.7473, lng: -97.0945 },
  { city: 'Houston', country: 'USA', flag: '🇺🇸', stadium: 'NRG Stadium', capacity: 72220, lat: 29.6847, lng: -95.4107 },
  { city: 'Kansas City', country: 'USA', flag: '🇺🇸', stadium: 'GEHA Field at Arrowhead Stadium', capacity: 76416, lat: 39.0489, lng: -94.4839 },
  { city: 'Los Angeles', country: 'USA', flag: '🇺🇸', stadium: 'SoFi Stadium', capacity: 70240, lat: 33.9535, lng: -118.3392 },
  { city: 'Miami', country: 'USA', flag: '🇺🇸', stadium: 'Hard Rock Stadium', capacity: 64767, lat: 25.9580, lng: -80.2389 },
  { city: 'New York / New Jersey', country: 'USA', flag: '🇺🇸', stadium: 'MetLife Stadium', capacity: 82500, lat: 40.8135, lng: -74.0745 },
  { city: 'Philadelphia', country: 'USA', flag: '🇺🇸', stadium: 'Lincoln Financial Field', capacity: 69176, lat: 39.9008, lng: -75.1675 },
  { city: 'San Francisco Bay Area', country: 'USA', flag: '🇺🇸', stadium: "Levi's Stadium", capacity: 68500, lat: 37.4030, lng: -121.9697 },
  { city: 'Seattle', country: 'USA', flag: '🇺🇸', stadium: 'Lumen Field', capacity: 68740, lat: 47.5952, lng: -122.3316 },
];
