import { useEffect, useState } from 'react';
import { Match, upcomingMatches, recentResults } from '../data/mockData';
import { fetchWorldCupMatches } from '../services/espn';

export type DataSource = 'loading' | 'live' | 'fallback';

interface WorldCupMatchesState {
  upcoming: Match[];
  results: Match[];
  source: DataSource;
}

// Fetches live World Cup fixtures/results, falling back to bundled data if the
// API is unavailable so the UI always renders something.
export const useWorldCupMatches = (): WorldCupMatchesState => {
  const [state, setState] = useState<WorldCupMatchesState>({
    upcoming: upcomingMatches,
    results: recentResults,
    source: 'loading',
  });

  useEffect(() => {
    let cancelled = false;

    fetchWorldCupMatches()
      .then(({ upcoming, results }) => {
        if (cancelled) return;
        setState({
          upcoming: upcoming.length > 0 ? upcoming : upcomingMatches,
          results,
          source: 'live',
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ upcoming: upcomingMatches, results: recentResults, source: 'fallback' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};
