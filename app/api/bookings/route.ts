import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/supabase";
import { z } from "zod";

const BookingSchema = z.object({
  property_id: z.string().uuid(),
  guest_name: z.string().min(2),
  guest_email: z.string().email(),
  guest_phone: z.string().min(6),
  check_in: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  check_out: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests_count: z.number().int().positive(),
  total_price: z.number().positive(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten() }, { status: 400 });
    }
    if (parsed.data.check_out <= parsed.data.check_in) {
      return NextResponse.json({ error: "Date de départ invalide" }, { status: 400 });
    }
    const booking = await createBooking(parsed.data);
    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
