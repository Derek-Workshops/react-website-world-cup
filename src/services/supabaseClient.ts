import { createClient, SupabaseClient } from '@supabase/supabase-js';

const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Accept either the bare project URL or one that accidentally includes a path
// like "/rest/v1/" and reduce it to the origin the client expects.
function normalizeUrl(raw?: string): string | undefined {
  if (!raw) return undefined;
  try {
    return new URL(raw).origin;
  } catch {
    return raw.replace(/\/+$/, '');
  }
}

const url = normalizeUrl(process.env.REACT_APP_SUPABASE_URL);

// The app still builds/runs without credentials; the Pool page shows a
// friendly "not configured" message instead of crashing.
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;
