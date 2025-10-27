import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSpline from './components/HeroSpline';
import Appointments from './components/Appointments';
import AuthModal from './components/AuthModal';

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('mc_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('mc_token') || '');

  const onAuthed = (u, t) => {
    setUser(u);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem('mc_user');
    localStorage.removeItem('mc_token');
    setUser(null);
    setToken('');
  };

  useEffect(() => {
    // Hydrate auth state if present
    try {
      const raw = localStorage.getItem('mc_user');
      const tok = localStorage.getItem('mc_token');
      if (raw && tok) {
        setUser(JSON.parse(raw));
        setToken(tok);
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar user={user} onLoginClick={() => setAuthOpen(true)} onLogout={logout} />
      <main className="pt-16">
        <HeroSpline />
        <section id="appointments" className="bg-slate-950">
          <Appointments token={token} />
        </section>
      </main>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthed={onAuthed} />
    </div>
  );
}

export default App;
