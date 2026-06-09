import { useEffect, useState } from 'react';
import { Fixture, fetchFixtures } from '../services/worldCupApi';

interface FixturesState {
  fixtures: Fixture[];
  loading: boolean;
  error: string | null;
}

export function useFixtures(): FixturesState {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchFixtures()
      .then((data) => {
        if (!active) return;
        setFixtures(data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to load data');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { fixtures, loading, error };
}
