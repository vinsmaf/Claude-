"use client";
import { useRouter } from "next/navigation";

export default function DeletePropertyButton({ id }: { id: string }) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm("Supprimer ce bien ?")) return;
    await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    router.refresh();
  }
  return (
    <button onClick={handleDelete} className="text-xs text-red-500 hover:underline">
      Supprimer
    </button>
  );
}
