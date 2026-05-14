import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createSupabaseServer();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString();

  const [{ data: allBookings }, { data: properties }] = await Promise.all([
    supabase.from("bookings").select("*").neq("status", "cancelled"),
    supabase.from("properties").select("id, name, price_per_night"),
  ]);

  const bookings = allBookings ?? [];
  const props = properties ?? [];

  const monthBookings = bookings.filter(b => b.created_at >= startOfMonth);
  const yearBookings = bookings.filter(b => b.created_at >= startOfYear);

  const revenueMonth = monthBookings.reduce((s: number, b: { total_price: number }) => s + (b.total_price ?? 0), 0);
  const revenueYear = yearBookings.reduce((s: number, b: { total_price: number }) => s + (b.total_price ?? 0), 0);
  const pending = bookings.filter((b: { status: string }) => b.status === "pending").length;

  // Revenue per property (year)
  const revenueByProperty = props.map((p: { id: string; name: string }) => {
    const rev = yearBookings
      .filter((b: { property_id: string }) => b.property_id === p.id)
      .reduce((s: number, b: { total_price: number }) => s + (b.total_price ?? 0), 0);
    const count = yearBookings.filter((b: { property_id: string }) => b.property_id === p.id).length;
    return { id: p.id, name: p.name, revenue: rev, bookings: count };
  });

  // Last 6 months revenue
  const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const end = new Date(now.getFullYear(), now.getMonth() - (4 - i), 1);
    const label = d.toLocaleDateString("fr-FR", { month: "short" });
    const rev = bookings
      .filter((b: { created_at: string }) => b.created_at >= d.toISOString() && b.created_at < end.toISOString())
      .reduce((s: number, b: { total_price: number }) => s + (b.total_price ?? 0), 0);
    return { label, revenue: rev };
  });

  return NextResponse.json({
    revenueMonth,
    revenueYear,
    totalBookings: bookings.length,
    pendingBookings: pending,
    revenueByProperty,
    monthlyRevenue,
  });
}
