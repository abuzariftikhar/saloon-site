"use client";

import { useState, useEffect } from "react";
import { bookAppointment, getBookedSlots } from "@/lib/actions";
import { formatPrice, generateTimeSlots } from "@/lib/utils";

type Service = {
  id: string;
  name: string;
  description: string | null;
  durationMinutes: number;
  priceInCents: number;
};

export default function BookingForm({
  services,
  isAdmin = false,
}: {
  services: Service[];
  isAdmin?: boolean;
}) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [pending, setPending] = useState(false);

  const allSlots = generateTimeSlots();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (selectedDate) {
      getBookedSlots(selectedDate).then((slots) => {
        setBookedSlots(slots);
      });
    }
  }, [selectedDate]);

  // Reset selected time whenever date changes
  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    setSelectedTime("");
  };

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setMessage(null);
    const result = await bookAppointment(formData);
    setPending(false);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Appointment booked successfully!" });
      // Reset form
      setSelectedService("");
      setSelectedDate("");
      setSelectedTime("");
      const form = document.getElementById("booking-form") as HTMLFormElement;
      form?.reset();
    }
  }

  const selectedServiceData = services.find((s) => s.id === selectedService);

  if (services.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-surface p-8 text-center">
        <p className="text-muted">
          No services available yet.{" "}
          {isAdmin ? "Add a service below first." : "Please check back later."}
        </p>
      </div>
    );
  }

  return (
    <form id="booking-form" action={handleSubmit} className="space-y-6">
      {isAdmin && <input type="hidden" name="bookedByAdmin" value="true" />}

      {/* Service selection */}
      <div>
        <label htmlFor="serviceId" className="block text-sm font-medium mb-1">
          Service *
        </label>
        <select
          id="serviceId"
          name="serviceId"
          required
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">Choose a service…</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {formatPrice(s.priceInCents)} ({s.durationMinutes} min)
            </option>
          ))}
        </select>
        {selectedServiceData?.description && (
          <p className="mt-1 text-xs text-muted">{selectedServiceData.description}</p>
        )}
      </div>

      {/* Client details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium mb-1">
            Client Name *
          </label>
          <input
            id="clientName"
            name="clientName"
            type="text"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="clientEmail" className="block text-sm font-medium mb-1">
            Client Email *
          </label>
          <input
            id="clientEmail"
            name="clientEmail"
            type="email"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="clientPhone" className="block text-sm font-medium mb-1">
            Phone (optional)
          </label>
          <input
            id="clientPhone"
            name="clientPhone"
            type="tel"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Date & time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date *
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={today}
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time *</label>
          {!selectedDate ? (
            <p className="text-xs text-muted py-2">Select a date first</p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {allSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedTime === slot;
                return (
                  <button
                    type="button"
                    key={slot}
                    disabled={isBooked}
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-md border px-2 py-1.5 text-sm transition-colors ${
                      isBooked
                        ? "cursor-not-allowed bg-gray-100 text-gray-400 line-through"
                        : isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 hover:border-primary"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          )}
          <input type="hidden" name="time" value={selectedTime} />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-1">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Feedback */}
      {message && (
        <div
          className={`rounded-lg p-3 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={pending || !selectedTime}
        className="w-full rounded-lg bg-primary py-3 font-semibold text-white shadow transition-colors hover:bg-primary-dark disabled:opacity-50"
      >
        {pending ? "Booking…" : "Confirm Appointment"}
      </button>
    </form>
  );
}
