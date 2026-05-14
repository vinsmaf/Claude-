import BarChart from "@/components/admin/BarChart";
import { formatPrice } from "@/lib/utils";

interface Stats {
  revenueMonth: number;
  revenueYear: number;
  totalBookings: number;
  pendingBookings: number;
  revenueByProperty: { id: string; name: string; revenue: number; bookings: number }[];
  monthlyRevenue: { label: string; revenue: number }[];
}

async function getStats(): Promise<Stats> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/admin/stats`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return { revenueMonth: 0, revenueYear: 0, totalBookings: 0, pendingBookings: 0, revenueByProperty: [], monthlyRevenue: [] };
  }
}

const KPI_CARDS = (s: Stats) => [
  { label: "Revenus ce mois", value: formatPrice(s.revenueMonth), sub: "hors annulations", color: "text-amber-600" },
  { label: "Revenus cette année", value: formatPrice(s.revenueYear), sub: "cumul annuel", color: "text-green-600" },
  { label: "Réservations totales", value: s.totalBookings, sub: "hors annulations", color: "text-blue-600" },
  { label: "En attente", value: s.pendingBookings, sub: "à confirmer", color: "text-orange-500" },
];

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Vue d'ensemble de votre activité</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_CARDS(stats).map(({ label, value, sub, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 p-5 space-y-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
            <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly revenue */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Revenus — 6 derniers mois</h2>
          <BarChart
            data={stats.monthlyRevenue.map(m => ({ label: m.label, value: m.revenue }))}
            color="#f59e0b"
          />
        </div>

        {/* Revenue by property */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Revenus par bien (année)</h2>
          <BarChart
            data={stats.revenueByProperty.map(p => ({
              label: p.name.split(" ").slice(0, 2).join(" "),
              value: p.revenue,
            }))}
            color="#10b981"
          />
        </div>
      </div>

      {/* Property breakdown table */}
      {stats.revenueByProperty.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Détail par bien</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Bien</th>
                <th className="px-6 py-3 text-right">Réservations</th>
                <th className="px-6 py-3 text-right">Revenus (année)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.revenueByProperty.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-3 text-right text-gray-500">{p.bookings}</td>
                  <td className="px-6 py-3 text-right font-semibold text-green-600">{formatPrice(p.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {stats.totalBookings === 0 && (
        <div className="rounded-xl border border-dashed border-gray-200 p-12 text-center text-gray-400">
          <p>Aucune donnée pour le moment.</p>
          <p className="text-sm mt-1">Configurez Supabase et ajoutez vos biens pour voir vos statistiques.</p>
        </div>
      )}
    </div>
  );
}
