import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export default function Analytics({ token }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/analytics/summary`, { headers: { Authorization: `Bearer ${token}` } });
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
        <h2 className="text-3xl font-bold">Analytics</h2>
        <p className="mt-2 text-slate-300">Simple insights to keep you informed.</p>
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {summary && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold">Totals</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>Platform users: <span className="font-semibold text-white">{summary.total_users}</span></li>
                <li>Your appointments: <span className="font-semibold text-white">{summary.your_appointments}</span></li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold">Last 7 days</h3>
              <div className="mt-4 space-y-2">
                {summary.last7.map((d) => (
                  <div key={d.day} className="flex items-center gap-3">
                    <div className="w-16 text-xs text-slate-400">{d.day.slice(5)}</div>
                    <div className="h-2 flex-1 bg-white/10 rounded">
                      <div className="h-2 rounded bg-cyan-500" style={{ width: `${Math.min(100, d.count * 20)}%` }} />
                    </div>
                    <div className="w-10 text-right text-sm">{d.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
