import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-primary">
        The Gentlemen&apos;s Barber
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Premium men&apos;s grooming at its finest. Book your next haircut, beard
        trim, or hot towel shave in seconds — walk in sharp, walk out sharper.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/book"
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow hover:bg-primary-dark transition-colors"
        >
          Book an Appointment
        </Link>
        <Link
          href="/admin"
          className="rounded-lg border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
        >
          Admin Dashboard
        </Link>
      </div>

      {/* ── Services overview ── */}
      <div className="mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
        {[
          {
            icon: "💈",
            title: "Haircuts & Fades",
            desc: "Classic cuts, skin fades, tapers, and modern styles — tailored to your look.",
          },
          {
            icon: "🪒",
            title: "Beard & Shaves",
            desc: "Expert beard trims, hot towel shaves, and lineup precision for a clean finish.",
          },
          {
            icon: "✨",
            title: "Grooming Packages",
            desc: "Full grooming combos with scalp treatments, facials, and styling — the works.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-gray-700 bg-surface p-6 text-left shadow-sm"
          >
            <span className="text-3xl">{f.icon}</span>
            <h3 className="mt-3 text-lg font-bold text-primary">{f.title}</h3>
            <p className="mt-1 text-sm text-muted">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Feature highlights ── */}
      <div className="mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
        {[
          {
            icon: "📅",
            title: "Easy Booking",
            desc: "Pick your service, choose a time, and you're locked in — done in under a minute.",
          },
          {
            icon: "🛡️",
            title: "Admin Control",
            desc: "Barbers can book for walk-ins, manage services, and view all appointments.",
          },
          {
            icon: "⚡",
            title: "Real-time Slots",
            desc: "Time slots update in real time so double-bookings never happen.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-gray-700 bg-surface p-6 text-left shadow-sm"
          >
            <span className="text-3xl">{f.icon}</span>
            <h3 className="mt-3 text-lg font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
