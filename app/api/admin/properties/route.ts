import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";
import { z } from "zod";

const PropertySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  address: z.string().optional(),
  city: z.string().min(1),
  price_per_night: z.number().positive(),
  max_guests: z.number().int().positive(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  images: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
});

export async function GET() {
  const supabase = createSupabaseServer();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServer();
  const body = await req.json();
  const parsed = PropertySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { data, error } = await supabase.from("properties").insert(parsed.data).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
