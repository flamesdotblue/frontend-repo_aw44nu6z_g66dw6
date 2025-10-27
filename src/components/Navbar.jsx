import { useState } from 'react';
import { Menu, X, LogIn, LogOut, Home } from 'lucide-react';

function NavLink({ label, href }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
    >
      {label}
    </a>
  );
}

export default function Navbar({ user, onLoginClick, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 ring-2 ring-cyan-400/40" />
            <a href="#home" className="text-white text-base font-semibold tracking-tight flex items-center gap-2">
              <Home size={16} /> MediConnect v25.0
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink label="Home" href="#home" />
            <NavLink label="Dashboard" href="#dashboard" />
            <NavLink label="Appointments" href="#appointments" />
            <NavLink label="Analytics" href="#analytics" />
          </nav>
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-slate-300">{user.name}</span>
                <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"><LogOut size={16}/> Logout</button>
              </>
            ) : (
              <button onClick={onLoginClick} className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-cyan-400"><LogIn size={16}/> Sign in</button>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-3">
              <NavLink label="Home" href="#home" />
              <NavLink label="Dashboard" href="#dashboard" />
              <NavLink label="Appointments" href="#appointments" />
              <NavLink label="Analytics" href="#analytics" />
              {user ? (
                <button onClick={onLogout} className="mt-2 inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:bg:white/10"><LogOut size={16} className="mr-2"/> Logout</button>
              ) : (
                <button onClick={onLoginClick} className="mt-2 inline-flex items-center justify-center rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400"><LogIn size={16} className="mr-2"/> Sign in</button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
