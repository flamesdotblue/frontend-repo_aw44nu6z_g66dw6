import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSpline from './components/HeroSpline';
import FeaturesGrid from './components/FeaturesGrid';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import Analytics from './components/Analytics';

function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || '/');
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('mc_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('mc_token') || '');

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const onAuthed = (u, t) => { setUser(u); setToken(t); };
  const logout = () => { localStorage.removeItem('mc_user'); localStorage.removeItem('mc_token'); setUser(null); setToken(''); };

  const Page = useMemo(() => {
    switch (route) {
      case '/dashboard':
        return <Dashboard user={user} token={token} />;
      case '/appointments':
        return <Appointments token={token} />;
      case '/analytics':
        return <Analytics token={token} />;
      case '/':
      default:
        return (
          <>
            <HeroSpline />
            <FeaturesGrid />
            <section id="appointments" className="bg-slate-950 text-white py-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Appointments made effortless</h2>
                  <p className="mt-3 text-slate-300">Manage availability, send reminders, and keep everyone in sync with real-time updates.</p>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[1,2,3].map((i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <p className="text-slate-300 text-sm">Demo timeslot #{i}: Efficient booking and conflict detection with instant confirmations.</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  }, [route, token, user]);

  return (
    <div className="min-h-screen w-full bg-slate-950">
      <Navbar user={user} onLoginClick={() => setAuthOpen(true)} onLogout={logout} />
      <main className="pt-16">{Page}</main>
      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthed={onAuthed} />
    </div>
  );
}

export default App;
