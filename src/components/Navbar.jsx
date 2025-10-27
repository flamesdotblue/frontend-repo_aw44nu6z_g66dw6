import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 ring-2 ring-cyan-400/40" />
            <span className="text-white text-base font-semibold tracking-tight">
              MediConnect v25.0
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <NavLink label="Dashboard" href="#dashboard" />
            <NavLink label="Appointments" href="#appointments" />
            <NavLink label="Analytics" href="#analytics" />
            <NavLink label="Admin" href="#admin" />
          </nav>
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
              <NavLink label="Dashboard" href="#dashboard" />
              <NavLink label="Appointments" href="#appointments" />
              <NavLink label="Analytics" href="#analytics" />
              <NavLink label="Admin" href="#admin" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
