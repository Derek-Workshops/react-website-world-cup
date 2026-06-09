import React, { useCallback, useEffect, useState } from 'react';
import { useAuth, isSupabaseConfigured } from '../context/AuthContext';
import { useWorldCupMatches } from '../hooks/useWorldCupMatches';
import {
  getMyPredictions,
  getAllPredictions,
  getProfiles,
  savePredictions,
  Prediction,
  ProfileRow,
} from '../services/poolApi';
import { buildLeaderboard, LeaderboardEntry } from '../utils/scoring';
import AuthPanel from '../components/pool/AuthPanel';
import PredictionList from '../components/pool/PredictionList';
import Leaderboard from '../components/pool/Leaderboard';
import PrizeBoard from '../components/pool/PrizeBoard';

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="text-center mb-10">
    <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">
      Office Prediction Pool
    </div>
    <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Predict. Compete. Win.</h1>
    <p className="text-white/40 max-w-2xl mx-auto">
      Sign up, predict the score of every match, and climb the leaderboard. The most accurate
      forecasters win the prizes.
    </p>
    {children}
  </div>
);

const PoolPage: React.FC = () => {
  const { user, displayName, loading: authLoading, signOut } = useAuth();
  const { upcoming, results } = useWorldCupMatches();

  const [myPredictions, setMyPredictions] = useState<Prediction[]>([]);
  const [allPredictions, setAllPredictions] = useState<Prediction[]>([]);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadPoolData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);
    setLoadError(null);
    try {
      const [mine, all, members] = await Promise.all([
        getMyPredictions(user.id),
        getAllPredictions(),
        getProfiles(),
      ]);
      setMyPredictions(mine);
      setAllPredictions(all);
      setProfiles(members);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Could not load pool data.');
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadPoolData();
  }, [loadPoolData]);

  const handleSave = async (rows: Prediction[]) => {
    await savePredictions(rows);
    await loadPoolData();
  };

  // All matches we know about (used to score finished games).
  const allMatches = [...upcoming, ...results];
  const leaderboard: LeaderboardEntry[] = buildLeaderboard(profiles, allPredictions, allMatches);

  // ── Not configured ──
  if (!isSupabaseConfigured) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Header />
        <div className="bg-[#003087]/20 border border-[#003087]/40 rounded-2xl p-8 text-center">
          <p className="text-white/70">
            ⚙️ The prediction pool needs a database connection to store sign-ups and entries.
            Add <code className="text-[#f5a623]">REACT_APP_SUPABASE_URL</code> and{' '}
            <code className="text-[#f5a623]">REACT_APP_SUPABASE_ANON_KEY</code> to enable it.
          </p>
        </div>
      </div>
    );
  }

  // ── Loading auth ──
  if (authLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <p className="text-white/40">Loading…</p>
      </div>
    );
  }

  // ── Signed out ──
  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Header />
        <div className="mb-10">
          <PrizeBoard />
        </div>
        <AuthPanel />
      </div>
    );
  }

  // ── Signed in ──
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-1">
            Office Prediction Pool
          </p>
          <h1 className="text-3xl font-black text-white">Welcome, {displayName} 👋</h1>
        </div>
        <button
          onClick={signOut}
          className="bg-white/10 hover:bg-white/20 text-white/80 text-sm font-semibold px-4 py-2 rounded-full transition-colors"
        >
          Sign out
        </button>
      </div>

      {loadError && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6">
          {loadError}
        </p>
      )}

      <div className="space-y-8">
        <Leaderboard entries={leaderboard} currentUserId={user.id} />

        {dataLoading ? (
          <p className="text-white/40 text-sm">Loading your predictions…</p>
        ) : (
          <PredictionList
            matches={upcoming}
            myPredictions={myPredictions}
            userId={user.id}
            onSave={handleSave}
          />
        )}

        <PrizeBoard />
      </div>
    </div>
  );
};

export default PoolPage;
