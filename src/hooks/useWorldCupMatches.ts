import { useEffect, useState } from 'react';
import { Match, upcomingMatches as fallbackUpcoming, recentResults as fallbackResults } from '../data/mockData';
import { fetchWorldCupMatches } from '../services/footballApi';

export type DataSource = 'live' | 'fallback';

interface State {
  upcoming: Match[];
  results: Match[];
  loading: boolean;
  error: string | null;
  source: DataSource;
}

/**
 * Loads live 2026 World Cup fixtures. While loading, and if the request fails,
 * it falls back to the bundled mock data so the UI always has something to show.
 */
export function useWorldCupMatches(): State {
  const [state, setState] = useState<State>({
    upcoming: [],
    results: [],
    loading: true,
    error: null,
    source: 'live',
  });

  useEffect(() => {
    let cancelled = false;

    fetchWorldCupMatches()
      .then(({ upcoming, results }) => {
        if (cancelled) return;
        setState({ upcoming, results, loading: false, error: null, source: 'live' });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : 'Unable to load live data';
        setState({
          upcoming: fallbackUpcoming,
          results: fallbackResults,
          loading: false,
          error: message,
          source: 'fallback',
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
