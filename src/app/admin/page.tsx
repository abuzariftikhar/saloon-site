import Link from "next/link";
import { getServices } from "@/lib/actions";
import BookingForm from "../book/BookingForm";
import AddServiceForm from "./AddServiceForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard – Salon Manager",
};

export default async function AdminPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <Link
          href="/admin/appointments"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          View All Appointments →
        </Link>
      </div>

      {/* ── Book for a client ── */}
      <section>
        <h2 className="text-xl font-bold mb-4">Book for a Client</h2>
        <div className="rounded-xl border border-gray-200 bg-surface p-6 shadow-sm">
          <BookingForm services={services} isAdmin />
        </div>
      </section>

      {/* ── Manage services ── */}
      <section>
        <h2 className="text-xl font-bold mb-4">Add a Service</h2>
        <div className="rounded-xl border border-gray-200 bg-surface p-6 shadow-sm">
          <AddServiceForm />
        </div>
      </section>

      {/* ── Current services ── */}
      {services.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Current Services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.id}
                className="rounded-xl border border-gray-200 bg-surface p-4 shadow-sm"
              >
                <h3 className="font-bold">{s.name}</h3>
                {s.description && (
                  <p className="mt-1 text-sm text-muted">{s.description}</p>
                )}
                <p className="mt-2 text-sm">
                  <span className="font-medium">
                    ${(s.priceInCents / 100).toFixed(2)}
                  </span>{" "}
                  · {s.durationMinutes} min
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
