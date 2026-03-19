import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-primary">
        Welcome to Salon Manager
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Book your next salon appointment in seconds — or let our staff schedule
        it for you. Choose a service, pick a time, and you&apos;re all set.
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

      {/* ── Feature highlights ── */}
      <div className="mt-20 grid max-w-4xl gap-8 sm:grid-cols-3">
        {[
          {
            icon: "📅",
            title: "Easy Booking",
            desc: "Clients pick a service, date and time — done in under a minute.",
          },
          {
            icon: "🛡️",
            title: "Admin Control",
            desc: "Staff can book on behalf of clients, manage services, and view all appointments.",
          },
          {
            icon: "⚡",
            title: "Real-time Slots",
            desc: "Time slots update in real time so double-bookings never happen.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-gray-200 bg-surface p-6 text-left shadow-sm"
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
