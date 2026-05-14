import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";
import { z } from "zod";

const PatchSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServer();
  const body = await req.json();
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  const { data, error } = await supabase
    .from("bookings").update(parsed.data).eq("id", params.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
