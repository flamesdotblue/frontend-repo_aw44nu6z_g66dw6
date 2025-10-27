import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export default function Appointments({ token }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [doctor, setDoctor] = useState('');
  const [when, setWhen] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to load');
      setItems(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { if (token) load(); }, [token]);

  const add = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, doctor, when: new Date(when).toISOString(), notes })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to create');
      setTitle(''); setDoctor(''); setWhen(''); setNotes('');
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/appointments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to delete');
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="bg-slate-950 text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Appointments</h2>
        <p className="mt-2 text-slate-300">Create and manage your schedule.</p>

        <form onSubmit={add} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} required placeholder="Title" className="rounded-md bg-white/5 p-2 outline-none ring-1 ring-white/10 focus:ring-cyan-500" />
          <input value={doctor} onChange={(e)=>setDoctor(e.target.value)} required placeholder="Doctor" className="rounded-md bg-white/5 p-2 outline-none ring-1 ring-white/10 focus:ring-cyan-500" />
          <input type="datetime-local" value={when} onChange={(e)=>setWhen(e.target.value)} required className="rounded-md bg-white/5 p-2 outline-none ring-1 ring-white/10 focus:ring-cyan-500" />
          <input value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Notes" className="rounded-md bg-white/5 p-2 outline-none ring-1 ring-white/10 focus:ring-cyan-500" />
          <button className="sm:col-span-2 lg:col-span-1 rounded-md bg-cyan-500 py-2 font-semibold text-slate-900 hover:bg-cyan-400">Add</button>
        </form>
        {error && <p className="mt-3 text-red-400">{error}</p>}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((it) => (
            <div key={it.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{it.title}</p>
                  <p className="text-sm text-slate-400">Dr. {it.doctor} • {new Date(it.when).toLocaleString()}</p>
                </div>
                <button onClick={() => remove(it.id)} className="rounded-md bg-red-500/90 px-3 py-1 text-sm font-semibold text-white hover:bg-red-400">Delete</button>
              </div>
              {it.notes && <p className="mt-3 text-sm text-slate-300">{it.notes}</p>}
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-slate-400">No appointments yet. Create your first one above.</p>
          )}
        </div>
      </div>
    </section>
  );
}
