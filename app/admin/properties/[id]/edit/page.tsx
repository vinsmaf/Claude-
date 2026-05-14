import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { getProperty } from "@/lib/supabase";

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);
  if (!property) notFound();
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Modifier — {property.name}</h1>
      </div>
      <PropertyForm initial={property} propertyId={property.id} />
    </div>
  );
}
