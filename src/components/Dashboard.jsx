import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export default function Dashboard({ token, user }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setError('');
      try {
        const res = await fetch(`${API_BASE}/api/analytics/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Failed to load');
        setSummary(data);
      } catch (e) {
        setError(e.message);
      }
    };
    if (token) load();
  }, [token]);

  return (
    <section className="bg-slate-950 text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Welcome back{user?.name ? `, ${user.name}` : ''}!</h2>
        <p className="mt-2 text-slate-300">Here is a quick overview of your account.</p>
        {error && <p className="mt-4 text-red-400">{error}</p>}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Total Users</p>
            <p className="mt-2 text-3xl font-semibold">{summary?.total_users ?? '—'}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Your Appointments</p>
            <p className="mt-2 text-3xl font-semibold">{summary?.your_appointments ?? '—'}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Active Session</p>
            <p className="mt-2 text-3xl font-semibold">{token ? 'Yes' : 'No'}</p>
          </div>
        </div>
        {summary?.last7 && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold">Last 7 days</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-7">
              {summary.last7.map((d) => (
                <div key={d.day} className="rounded-md bg-white/5 p-3">
                  <p className="text-xs text-slate-400">{d.day.slice(5)}</p>
                  <div className="mt-2 h-16 w-full bg-white/10">
                    <div className="h-full bg-cyan-500" style={{ width: `${Math.min(100, d.count * 20)}%` }} />
                  </div>
                  <p className="mt-1 text-sm">{d.count} appt</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
