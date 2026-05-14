import { createClient } from "@supabase/supabase-js";
import type { Property, Booking } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getProperty(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function getBookedDates(propertyId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("check_in, check_out")
    .eq("property_id", propertyId)
    .neq("status", "cancelled");
  if (error || !data) return [];

  const dates: string[] = [];
  for (const b of data) {
    const start = new Date(b.check_in);
    const end = new Date(b.check_out);
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split("T")[0]);
    }
  }
  return dates;
}

export async function createBooking(
  booking: Omit<Booking, "id" | "created_at" | "status">
): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .insert({ ...booking, status: "pending" })
    .select()
    .single();
  if (error) throw error;
  return data;
}
