import { NextResponse } from "next/server";
import { getProperties } from "@/lib/supabase";

export async function GET() {
  try {
    const properties = await getProperties();
    return NextResponse.json(properties);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
