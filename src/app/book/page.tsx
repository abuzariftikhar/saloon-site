import { getServices } from "@/lib/actions";
import BookingForm from "./BookingForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book an Appointment – Salon Manager",
};

export default async function BookPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary">Book an Appointment</h1>
      <p className="mt-2 text-muted">
        Choose a service, pick your preferred date &amp; time, and we&apos;ll
        see you there!
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-surface p-6 shadow-sm">
        <BookingForm services={services} />
      </div>
    </div>
  );
}
