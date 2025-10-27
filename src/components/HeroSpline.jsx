import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroSpline() {
  return (
    <section className="relative min-h-[90vh] w-full bg-slate-950 text-white">
      {/* 3D Spline Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlays for readability (do not block interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-900/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
            v25.0 • Futuristic Healthcare Platform
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Connect Patients, Doctors, and Data — Seamlessly
          </h1>
          <p className="mt-4 text-slate-300 text-lg md:text-xl">
            Secure authentication, real-time scheduling, file uploads, and actionable analytics. Built for modern care teams.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#appointments"
              className="inline-flex items-center justify-center rounded-md bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Book an Appointment
            </a>
            <a
              href="#analytics"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              View Dashboard
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
