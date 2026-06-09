import { supabase } from './supabaseClient';

export interface Prediction {
  user_id: string;
  match_id: number;
  predicted_home: number;
  predicted_away: number;
}

export interface ProfileRow {
  id: string;
  display_name: string;
}

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured');
  return supabase;
}

/** All predictions made by the signed-in user. */
export async function getMyPredictions(userId: string): Promise<Prediction[]> {
  const client = requireClient();
  const { data, error } = await client
    .from('predictions')
    .select('user_id, match_id, predicted_home, predicted_away')
    .eq('user_id', userId);
  if (error) throw error;
  return data ?? [];
}

/** Insert or update the user's predictions for a set of matches. */
export async function savePredictions(rows: Prediction[]): Promise<void> {
  if (rows.length === 0) return;
  const client = requireClient();
  const { error } = await client
    .from('predictions')
    .upsert(rows, { onConflict: 'user_id,match_id' });
  if (error) throw error;
}

/** Every prediction in the pool — used to compute the leaderboard. */
export async function getAllPredictions(): Promise<Prediction[]> {
  const client = requireClient();
  const { data, error } = await client
    .from('predictions')
    .select('user_id, match_id, predicted_home, predicted_away');
  if (error) throw error;
  return data ?? [];
}

/** All pool members (id -> display name). */
export async function getProfiles(): Promise<ProfileRow[]> {
  const client = requireClient();
  const { data, error } = await client.from('profiles').select('id, display_name');
  if (error) throw error;
  return data ?? [];
}
