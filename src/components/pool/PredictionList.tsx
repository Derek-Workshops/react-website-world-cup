import React, { useMemo, useState } from 'react';
import { Match } from '../../data/mockData';
import { Prediction } from '../../services/poolApi';

interface Props {
  matches: Match[];
  myPredictions: Prediction[];
  userId: string;
  onSave: (rows: Prediction[]) => Promise<void>;
}

interface Entry {
  home: string;
  away: string;
}

const TeamSide: React.FC<{ badge?: string; name: string }> = ({ badge, name }) => (
  <div className="flex items-center gap-2 min-w-0">
    {badge && <img src={badge} alt={name} loading="lazy" className="w-7 h-7 object-contain shrink-0" />}
    <span className="text-white text-sm font-medium truncate">{name}</span>
  </div>
);

const PredictionList: React.FC<Props> = ({ matches, myPredictions, userId, onSave }) => {
  const initial = useMemo(() => {
    const map: Record<number, Entry> = {};
    for (const p of myPredictions) {
      map[p.match_id] = { home: String(p.predicted_home), away: String(p.predicted_away) };
    }
    return map;
  }, [myPredictions]);

  const [entries, setEntries] = useState<Record<number, Entry>>(initial);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (matchId: number, side: 'home' | 'away', value: string) => {
    const clean = value.replace(/[^0-9]/g, '').slice(0, 2);
    setEntries((prev) => {
      const current = prev[matchId] ?? { home: '', away: '' };
      return { ...prev, [matchId]: { ...current, [side]: clean } };
    });
    setSavedMsg(null);
  };

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const rows: Prediction[] = Object.entries(entries)
        .filter(([, e]) => e.home !== '' && e.away !== '')
        .map(([matchId, e]) => ({
          user_id: userId,
          match_id: Number(matchId),
          predicted_home: Number(e.home),
          predicted_away: Number(e.away),
        }));
      await onSave(rows);
      setSavedMsg(`Saved ${rows.length} prediction${rows.length === 1 ? '' : 's'}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save predictions.');
    } finally {
      setSaving(false);
    }
  };

  const scoreInput =
    'w-12 text-center bg-white/10 border border-white/15 rounded-lg py-1.5 text-white font-bold tabular-nums focus:outline-none focus:border-[#f5a623]/60';

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-black text-xl">⚽ Your Predictions</h3>
        <span className="text-white/40 text-xs">Enter the score you think each match will end</span>
      </div>

      <div className="divide-y divide-white/10">
        {matches.map((m) => {
          const e = entries[m.id] ?? { home: '', away: '' };
          return (
            <div key={m.id} className="py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="justify-self-end w-full max-w-[40%] sm:max-w-none flex justify-end">
                <TeamSide badge={m.homeBadge} name={m.homeTeam} />
              </div>
              <div className="flex items-center gap-2">
                <input
                  className={scoreInput}
                  inputMode="numeric"
                  value={e.home}
                  onChange={(ev) => update(m.id, 'home', ev.target.value)}
                  aria-label={`${m.homeTeam} score`}
                />
                <span className="text-white/40 text-xs">vs</span>
                <input
                  className={scoreInput}
                  inputMode="numeric"
                  value={e.away}
                  onChange={(ev) => update(m.id, 'away', ev.target.value)}
                  aria-label={`${m.awayTeam} score`}
                />
              </div>
              <TeamSide badge={m.awayBadge} name={m.awayTeam} />
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#f5a623] hover:bg-[#e09510] disabled:opacity-60 text-[#0a0a1a] font-bold px-6 py-2.5 rounded-xl transition-colors"
        >
          {saving ? 'Saving…' : 'Save predictions'}
        </button>
        {savedMsg && <span className="text-green-400 text-sm">{savedMsg}</span>}
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
    </div>
  );
};

export default PredictionList;
