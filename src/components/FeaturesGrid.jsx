import { Calendar, Shield, BarChart3, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Calendar,
    title: 'Scheduling & Reminders',
    desc: 'Smart appointment management with conflict detection and reminders.'
  },
  {
    icon: Shield,
    title: 'Secure Auth & OTP',
    desc: 'JWT with refresh flow and OTP email login built for enterprise security.'
  },
  {
    icon: Upload,
    title: 'Encrypted File Uploads',
    desc: 'HIPAA-ready file handling via S3 with audit trails and versioning.'
  },
  {
    icon: BarChart3,
    title: 'Actionable Analytics',
    desc: 'Monitor outcomes, utilization, and patient trends in real time.'
  }
];

export default function FeaturesGrid() {
  return (
    <section id="analytics" className="relative bg-slate-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Built for the future of connected care
          </h2>
          <p className="mt-3 text-slate-300">
            Powerful capabilities wrapped in a beautiful, easy-to-use interface.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 hover:border-cyan-500/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/30">
                <f.icon size={18} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
