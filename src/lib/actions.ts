"use server";

import { db } from "@/db";
import { services, appointments } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/* ─── Service actions ─── */

export async function getServices() {
  return db.select().from(services).where(eq(services.active, true)).orderBy(asc(services.name));
}

export async function createService(formData: FormData) {
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  const durationMinutes = Number(formData.get("durationMinutes"));
  const priceInCents = Math.round(Number((formData.get("price") as string || "0")) * 100 + 0.001);

  if (!name || isNaN(durationMinutes) || durationMinutes <= 0 || isNaN(priceInCents) || priceInCents < 0) {
    return { error: "Please fill in all required fields." };
  }

  await db.insert(services).values({
    name,
    description,
    durationMinutes,
    priceInCents,
  });

  revalidatePath("/admin");
  revalidatePath("/book");
  return { success: true };
}

/* ─── Appointment actions ─── */

export async function getAppointments() {
  return db
    .select({
      id: appointments.id,
      clientName: appointments.clientName,
      clientEmail: appointments.clientEmail,
      clientPhone: appointments.clientPhone,
      date: appointments.date,
      time: appointments.time,
      notes: appointments.notes,
      status: appointments.status,
      bookedByAdmin: appointments.bookedByAdmin,
      createdAt: appointments.createdAt,
      serviceName: services.name,
      serviceDuration: services.durationMinutes,
      servicePrice: services.priceInCents,
    })
    .from(appointments)
    .innerJoin(services, eq(appointments.serviceId, services.id))
    .orderBy(asc(appointments.date), asc(appointments.time));
}

export async function bookAppointment(formData: FormData) {
  const serviceId = formData.get("serviceId") as string;
  const clientName = formData.get("clientName") as string;
  const clientEmail = formData.get("clientEmail") as string;
  const clientPhone = (formData.get("clientPhone") as string) || null;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const notes = (formData.get("notes") as string) || null;
  const bookedByAdmin = formData.get("bookedByAdmin") === "true";

  if (!serviceId || !clientName || !clientEmail || !date || !time) {
    return { error: "Please fill in all required fields." };
  }

  // Check for conflicting appointment
  const existing = await db
    .select()
    .from(appointments)
    .where(
      and(
        eq(appointments.date, date),
        eq(appointments.time, time),
        eq(appointments.status, "confirmed")
      )
    );

  if (existing.length > 0) {
    return { error: "This time slot is already booked. Please choose another time." };
  }

  await db.insert(appointments).values({
    serviceId,
    clientName,
    clientEmail,
    clientPhone,
    date,
    time,
    notes,
    bookedByAdmin,
  });

  revalidatePath("/admin/appointments");
  revalidatePath("/book");
  return { success: true };
}

export async function cancelAppointment(id: string) {
  await db
    .update(appointments)
    .set({ status: "cancelled" })
    .where(eq(appointments.id, id));

  revalidatePath("/admin/appointments");
  return { success: true };
}

export async function getBookedSlots(date: string) {
  const booked = await db
    .select({ time: appointments.time })
    .from(appointments)
    .where(
      and(eq(appointments.date, date), eq(appointments.status, "confirmed"))
    );
  return booked.map((b) => b.time);
}
