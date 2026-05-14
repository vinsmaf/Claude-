import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const supabase = createSupabaseServer();
  const status = req.nextUrl.searchParams.get("status");

  let query = supabase
    .from("bookings")
    .select("*, properties(name, city)")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
