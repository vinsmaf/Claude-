import { notFound } from "next/navigation";
import Image from "next/image";
import { getProperty, getBookedDates } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import PropertyBookingPanel from "@/components/PropertyBookingPanel";

interface Props {
  params: { id: string };
}

export default async function PropertyPage({ params }: Props) {
  const [property, bookedDates] = await Promise.all([
    getProperty(params.id),
    getBookedDates(params.id),
  ]);

  if (!property) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Images */}
      <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-gray-100 mb-8">
        {property.images[0] && (
          <Image src={property.images[0]} alt={property.name} fill className="object-cover" />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Infos */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{property.name}</h1>
            <p className="text-gray-500 mt-1">{property.address}, {property.city}</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>🛏 {property.bedrooms} chambre{property.bedrooms > 1 ? "s" : ""}</span>
            <span>🚿 {property.bathrooms} sdb</span>
            <span>👥 {property.max_guests} pers. max</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{property.description}</p>
          {property.amenities?.length > 0 && (
            <div>
              <h2 className="font-semibold text-gray-900 mb-3">Équipements</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map(a => (
                  <span key={a} className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs text-amber-700">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Disponibilités</h2>
            <AvailabilityCalendar bookedDates={bookedDates} onSelect={() => {}} />
          </div>
        </div>

        {/* Panneau réservation */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <p className="text-2xl font-bold text-amber-600 mb-4">
              {formatPrice(property.price_per_night)}
              <span className="text-base font-normal text-gray-400"> / nuit</span>
            </p>
            <PropertyBookingPanel
              propertyId={property.id}
              pricePerNight={property.price_per_night}
              bookedDates={bookedDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
