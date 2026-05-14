import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Nouveau bien</h1>
        <p className="text-sm text-gray-400 mt-1">Ajoutez un bien à votre portefeuille</p>
      </div>
      <PropertyForm />
    </div>
  );
}
