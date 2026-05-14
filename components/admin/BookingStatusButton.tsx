"use client";
import { useRouter } from "next/navigation";

interface Props { id: string; current: string; }

export default function BookingStatusButton({ id, current }: Props) {
  const router = useRouter();

  async function update(status: string) {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <div className="flex gap-1 justify-end">
      {current !== "confirmed" && (
        <button onClick={() => update("confirmed")} className="text-xs rounded px-2 py-1 bg-green-50 text-green-700 hover:bg-green-100">
          Confirmer
        </button>
      )}
      {current !== "cancelled" && (
        <button onClick={() => update("cancelled")} className="text-xs rounded px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100">
          Annuler
        </button>
      )}
    </div>
  );
}
