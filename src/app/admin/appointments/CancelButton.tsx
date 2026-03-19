"use client";

import { cancelAppointment } from "@/lib/actions";
import { useState } from "react";

export default function CancelButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false);

  async function handleCancel() {
    if (!confirm("Cancel this appointment?")) return;
    setPending(true);
    await cancelAppointment(id);
    setPending(false);
  }

  return (
    <button
      onClick={handleCancel}
      disabled={pending}
      className="text-xs font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {pending ? "Cancelling…" : "Cancel"}
    </button>
  );
}
