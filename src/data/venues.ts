// Coordinates for the 16 host stadiums of the 2026 FIFA World Cup.
// Keyed by the exact venue name returned by TheSportsDB so fixtures can be matched.

export interface Venue {
  name: string;
  city: string;
  country: 'USA' | 'Canada' | 'Mexico';
  lat: number;
  lng: number;
}

export const VENUES: Record<string, Venue> = {
  'MetLife Stadium': { name: 'MetLife Stadium', city: 'New York / New Jersey', country: 'USA', lat: 40.8135, lng: -74.0745 },
  'SoFi Stadium': { name: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', lat: 33.9535, lng: -118.3392 },
  'AT&T Stadium': { name: 'AT&T Stadium', city: 'Dallas', country: 'USA', lat: 32.7473, lng: -97.0945 },
  'Mercedes-Benz Stadium': { name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', lat: 33.7553, lng: -84.4006 },
  'Hard Rock Stadium': { name: 'Hard Rock Stadium', city: 'Miami', country: 'USA', lat: 25.958, lng: -80.2389 },
  'Levi\'s Stadium': { name: "Levi's Stadium", city: 'San Francisco Bay Area', country: 'USA', lat: 37.403, lng: -121.9697 },
  'Lincoln Financial Field': { name: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', lat: 39.9008, lng: -75.1675 },
  'Lumen Field': { name: 'Lumen Field', city: 'Seattle', country: 'USA', lat: 47.5952, lng: -122.3316 },
  'Gillette Stadium': { name: 'Gillette Stadium', city: 'Boston', country: 'USA', lat: 42.0909, lng: -71.2643 },
  'Reliant Stadium': { name: 'NRG Stadium', city: 'Houston', country: 'USA', lat: 29.6847, lng: -95.4107 },
  'GEHA Field at Arrowhead Stadium': { name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', lat: 39.0489, lng: -94.4839 },
  'BC Place': { name: 'BC Place', city: 'Vancouver', country: 'Canada', lat: 49.2768, lng: -123.112 },
  'BMO Field': { name: 'BMO Field', city: 'Toronto', country: 'Canada', lat: 43.6332, lng: -79.4185 },
  'Estadio Azteca': { name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', lat: 19.3029, lng: -99.1505 },
  'Estadio Akron': { name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', lat: 20.6819, lng: -103.4626 },
  'Estadio BBVA': { name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', lat: 25.6694, lng: -100.2447 },
};

export const getVenue = (name: string): Venue | undefined => VENUES[name];
