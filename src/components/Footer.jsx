export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-slate-400 text-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} MediConnect v25.0. All rights reserved.
          </p>
          <nav className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white">Privacy</a>
            <a href="#terms" className="hover:text-white">Terms</a>
            <a href="#security" className="hover:text-white">Security</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
