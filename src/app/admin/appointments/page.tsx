import { getAppointments } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import CancelButton from "./CancelButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Appointments – The Gentlemen's Barber",
};

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary">All Appointments</h1>
      <p className="mt-2 text-muted">
        View and manage every appointment at the shop.
      </p>

      {appointments.length === 0 ? (
        <p className="mt-8 text-center text-muted">No appointments yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-700 text-xs uppercase text-muted">
              <tr>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Time</th>
                <th className="px-3 py-3">Client</th>
                <th className="px-3 py-3">Service</th>
                <th className="px-3 py-3">Price</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Source</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-800">
                  <td className="px-3 py-3 whitespace-nowrap">{a.date}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{a.time}</td>
                  <td className="px-3 py-3">
                    <div className="font-medium">{a.clientName}</div>
                    <div className="text-xs text-muted">{a.clientEmail}</div>
                  </td>
                  <td className="px-3 py-3">{a.serviceName}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {formatPrice(a.servicePrice)}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        a.status === "confirmed"
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-xs">
                    {a.bookedByAdmin ? "Barber" : "Client"}
                  </td>
                  <td className="px-3 py-3">
                    {a.status === "confirmed" && <CancelButton id={a.id} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
