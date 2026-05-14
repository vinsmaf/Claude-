"use client";
import { useState } from "react";
import type { BookingFormData } from "@/types";
import { formatPrice, nightsBetween } from "@/lib/utils";

interface Props {
  propertyId: string;
  pricePerNight: number;
  checkIn: string;
  checkOut: string;
}

export default function BookingForm({ propertyId, pricePerNight, checkIn, checkOut }: Props) {
  const [form, setForm] = useState<BookingFormData>({
    guest_name: "", guest_email: "", guest_phone: "",
    check_in: checkIn, check_out: checkOut, guests_count: 1,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const nights = nightsBetween(checkIn, checkOut);
  const total = nights * pricePerNight;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, property_id: propertyId, total_price: total }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-green-700 font-semibold">Demande envoyée !</p>
        <p className="text-sm text-green-600 mt-1">Nous vous confirmons par email sous 24h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 text-lg">Réserver</h3>
      {nights > 0 && (
        <p className="text-sm text-gray-500">
          {nights} nuit{nights > 1 ? "s" : ""} · <span className="font-semibold text-amber-600">{formatPrice(total)}</span>
        </p>
      )}
      {[
        { id: "guest_name", label: "Nom complet", type: "text" },
        { id: "guest_email", label: "Email", type: "email" },
        { id: "guest_phone", label: "Téléphone", type: "tel" },
      ].map(({ id, label, type }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <input
            id={id} type={type} required
            value={form[id as keyof BookingFormData] as string}
            onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      ))}
      <div>
        <label htmlFor="guests_count" className="block text-sm font-medium text-gray-700 mb-1">Voyageurs</label>
        <input
          id="guests_count" type="number" min={1} required
          value={form.guests_count}
          onChange={e => setForm(f => ({ ...f, guests_count: +e.target.value }))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
      {status === "error" && (
        <p className="text-red-600 text-sm">Une erreur est survenue. Réessayez.</p>
      )}
      <button
        type="submit" disabled={status === "loading" || nights === 0}
        className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-400 disabled:opacity-50 transition-colors"
      >
        {status === "loading" ? "Envoi…" : "Demander la réservation"}
      </button>
    </form>
  );
}
