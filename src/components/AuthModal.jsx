import { useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export default function AuthModal({ open, onClose, onAuthed }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' ? { email, password } : { name, email, password };
      const res = await fetch(`${API_BASE}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Authentication failed');
      localStorage.setItem('mc_token', data.token);
      localStorage.setItem('mc_user', JSON.stringify(data.user));
      onAuthed(data.user, data.token);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900 p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white">✕</button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-sm text-slate-300">Name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} required className="mt-1 w-full rounded-md bg-white/5 p-2 outline-none ring-1 ring-white/10 focus:ring-cyan-500" />
            </div>
          )}
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-1 w-full rounded-md bg-white/5 p-2 outline-none ring-1 ring-white/10 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="mt-1 w-full rounded-md bg-white/5 p-2 outline-none ring-1 ring-white/10 focus:ring-cyan-500" />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button disabled={loading} className="w-full rounded-md bg-cyan-500 py-2 font-semibold text-slate-900 hover:bg-cyan-400 disabled:opacity-50">
            {loading ? 'Please wait…' : (mode === 'login' ? 'Sign in' : 'Create account')}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-400">
          {mode === 'login' ? (
            <>Don't have an account? <button onClick={()=>setMode('register')} className="text-cyan-300 hover:text-cyan-200">Create one</button></>
          ) : (
            <>Already have an account? <button onClick={()=>setMode('login')} className="text-cyan-300 hover:text-cyan-200">Sign in</button></>
          )}
        </p>
      </div>
    </div>
  );
}
