"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Property } from "@/types";

type FormData = Omit<Property, "id" | "created_at" | "images">;

interface Props {
  initial?: Partial<Property>;
  propertyId?: string;
}

export default function PropertyForm({ initial, propertyId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    address: initial?.address ?? "",
    city: initial?.city ?? "",
    price_per_night: initial?.price_per_night ?? 100,
    max_guests: initial?.max_guests ?? 4,
    bedrooms: initial?.bedrooms ?? 1,
    bathrooms: initial?.bathrooms ?? 1,
    amenities: initial?.amenities ?? [],
  });
  const [amenityInput, setAmenityInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(k: keyof FormData, v: unknown) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function addAmenity() {
    const val = amenityInput.trim();
    if (val && !form.amenities.includes(val)) {
      set("amenities", [...form.amenities, val]);
    }
    setAmenityInput("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const url = propertyId ? `/api/admin/properties/${propertyId}` : "/api/admin/properties";
    const method = propertyId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError("Erreur lors de l'enregistrement.");
      setLoading(false);
    } else {
      router.push("/admin/properties");
      router.refresh();
    }
  }

  const FIELDS: { key: keyof FormData; label: string; type: string }[] = [
    { key: "name", label: "Nom du bien", type: "text" },
    { key: "address", label: "Adresse", type: "text" },
    { key: "city", label: "Ville / Destination", type: "text" },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 space-y-5 max-w-2xl">
      {FIELDS.map(({ key, label, type }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <input
            type={type} required value={form[key] as string}
            onChange={e => set(key, e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          rows={3} value={form.description}
          onChange={e => set("description", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { key: "price_per_night", label: "Prix / nuit (€)" },
          { key: "max_guests", label: "Voyageurs max" },
          { key: "bedrooms", label: "Chambres" },
          { key: "bathrooms", label: "Salles de bain" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="number" min={1} value={form[key as keyof FormData] as number}
              onChange={e => set(key as keyof FormData, +e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Équipements</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text" value={amenityInput}
            onChange={e => setAmenityInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addAmenity())}
            placeholder="Ex: Piscine, Wifi, Clim…"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button type="button" onClick={addAmenity} className="rounded-lg bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200">+</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.amenities.map(a => (
            <span key={a} className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-0.5 text-xs text-amber-700">
              {a}
              <button type="button" onClick={() => set("amenities", form.amenities.filter(x => x !== a))} className="hover:text-red-500">×</button>
            </span>
          ))}
        </div>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3 pt-2">
        <button
          type="submit" disabled={loading}
          className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-400 disabled:opacity-50"
        >
          {loading ? "Enregistrement…" : propertyId ? "Mettre à jour" : "Créer le bien"}
        </button>
        <button
          type="button" onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
