import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AuthPanel: React.FC = () => {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === 'signup') {
        if (name.trim().length < 2) throw new Error('Please enter your name.');
        await signUp(email.trim(), password, name.trim());
      } else {
        await signIn(email.trim(), password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#f5a623]/60 transition-colors';

  return (
    <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
      <div className="flex gap-2 mb-6 bg-white/5 rounded-full p-1">
        {(['signup', 'login'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setError(null); }}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${
              mode === m ? 'bg-[#f5a623] text-[#0a0a1a]' : 'text-white/60 hover:text-white'
            }`}
          >
            {m === 'signup' ? 'Sign Up' : 'Log In'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <input
            className={inputClass}
            type="text"
            placeholder="Display name (shown on leaderboard)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        )}
        <input
          className={inputClass}
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Password (at least 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          minLength={6}
          required
        />

        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#f5a623] hover:bg-[#e09510] disabled:opacity-60 text-[#0a0a1a] font-bold py-3 rounded-xl transition-colors"
        >
          {submitting ? 'Please wait…' : mode === 'signup' ? 'Create account & join pool' : 'Log in'}
        </button>
      </form>
    </div>
  );
};

export default AuthPanel;
