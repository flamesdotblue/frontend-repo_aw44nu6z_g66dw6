import Navbar from './components/Navbar';
import HeroSpline from './components/HeroSpline';
import FeaturesGrid from './components/FeaturesGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950">
      <Navbar />
      <main>
        <HeroSpline />
        <FeaturesGrid />
        {/* Appointments anchor section */}
        <section id="appointments" className="bg-slate-950 text-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Appointments made effortless
              </h2>
              <p className="mt-3 text-slate-300">
                Manage availability, send reminders, and keep everyone in sync with real-time updates.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1,2,3].map((i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <p className="text-slate-300 text-sm">
                    Demo timeslot #{i}: Efficient booking and conflict detection with instant confirmations.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
