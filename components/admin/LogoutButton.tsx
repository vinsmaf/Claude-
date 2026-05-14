"use client";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }
  return (
    <button
      onClick={logout}
      className="w-full rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
    >
      ↩ Déconnexion
    </button>
  );
}
