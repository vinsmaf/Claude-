import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/properties", label: "Biens", icon: "🏡" },
  { href: "/admin/bookings", label: "Réservations", icon: "📅" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <span className="text-lg font-extrabold text-amber-600">Amaryllis Corp</span>
          <p className="text-xs text-gray-400 mt-0.5">Back-office</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <span>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-100">
          <LogoutButton />
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
