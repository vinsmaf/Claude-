import BookingStatusButton from "@/components/admin/BookingStatusButton";
import { formatPrice } from "@/lib/utils";

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  pending: { label: "En attente", cls: "bg-orange-50 text-orange-600" },
  confirmed: { label: "Confirmée", cls: "bg-green-50 text-green-700" },
  cancelled: { label: "Annulée", cls: "bg-red-50 text-red-600" },
};

interface BookingRow {
  id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  total_price: number;
  status: string;
  created_at: string;
  properties: { name: string; city: string } | null;
}

async function getBookings(): Promise<BookingRow[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/admin/bookings`,
      { cache: "no-store" }
    );
    return res.ok ? res.json() : [];
  } catch { return []; }
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Réservations</h1>
        <p className="text-sm text-gray-400 mt-1">{bookings.length} réservation{bookings.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Status summary */}
      <div className="flex gap-3 flex-wrap">
        {Object.entries(STATUS_LABELS).map(([key, { label, cls }]) => {
          const count = bookings.filter(b => b.status === key).length;
          return (
            <span key={key} className={`rounded-full px-3 py-1 text-xs font-medium ${cls}`}>
              {label} · {count}
            </span>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {bookings.length === 0 ? (
          <div className="p-16 text-center text-gray-400">Aucune réservation.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Bien</th>
                  <th className="px-4 py-3 text-left">Voyageur</th>
                  <th className="px-4 py-3 text-left">Dates</th>
                  <th className="px-4 py-3 text-center">Pers.</th>
                  <th className="px-4 py-3 text-right">Montant</th>
                  <th className="px-4 py-3 text-center">Statut</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map(b => {
                  const { label, cls } = STATUS_LABELS[b.status] ?? STATUS_LABELS.pending;
                  return (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{b.properties?.name ?? "—"}</p>
                        <p className="text-xs text-gray-400">{b.properties?.city}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-800">{b.guest_name}</p>
                        <p className="text-xs text-gray-400">{b.guest_email}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                        {b.check_in} → {b.check_out}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">{b.guests_count}</td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">{formatPrice(b.total_price)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>{label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <BookingStatusButton id={b.id} current={b.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
