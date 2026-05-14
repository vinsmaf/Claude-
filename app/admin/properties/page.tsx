import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";

async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/admin/properties`,
      { cache: "no-store" }
    );
    return res.ok ? res.json() : [];
  } catch { return []; }
}

export default async function AdminPropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Biens</h1>
          <p className="text-sm text-gray-400 mt-1">{properties.length} propriété{properties.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-400 transition-colors"
        >
          + Ajouter un bien
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {properties.length === 0 ? (
          <div className="p-16 text-center text-gray-400">
            <p>Aucun bien. <Link href="/admin/properties/new" className="text-amber-600 hover:underline">Ajoutez votre premier bien →</Link></p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Nom</th>
                <th className="px-6 py-3 text-left">Ville</th>
                <th className="px-6 py-3 text-center">Chambres</th>
                <th className="px-6 py-3 text-center">Pers. max</th>
                <th className="px-6 py-3 text-right">Prix / nuit</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-4 text-gray-500">{p.city}</td>
                  <td className="px-6 py-4 text-center text-gray-500">{p.bedrooms}</td>
                  <td className="px-6 py-4 text-center text-gray-500">{p.max_guests}</td>
                  <td className="px-6 py-4 text-right font-semibold text-amber-600">{formatPrice(p.price_per_night)}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/properties/${p.id}/edit`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Modifier
                    </Link>
                    <DeletePropertyButton id={p.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
