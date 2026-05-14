import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/types";

async function fetchProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/properties`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function PropertiesPage() {
  const properties = await fetchProperties();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Nos biens</h1>
        <p className="text-gray-500 mt-2 text-sm">
          {properties.length} propriété{properties.length !== 1 ? "s" : ""} disponible{properties.length !== 1 ? "s" : ""}
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-16 text-center text-gray-400">
          <p className="text-lg">Aucun bien disponible pour le moment.</p>
          <p className="text-sm mt-1">Revenez bientôt ou configurez votre base Supabase.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
