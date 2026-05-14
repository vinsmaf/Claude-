import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function PropertyCard({ property }: { property: Property }) {
  const thumb = property.images[0] ?? "/placeholder.jpg";
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="relative h-52 w-full bg-gray-100">
        <Image
          src={thumb}
          alt={property.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-gray-900 truncate">{property.name}</h3>
        <p className="text-sm text-gray-500 truncate">{property.city}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-amber-600 font-bold">
            {formatPrice(property.price_per_night)}
            <span className="text-gray-400 font-normal text-xs"> / nuit</span>
          </span>
          <span className="text-xs text-gray-400">
            {property.bedrooms} ch. · {property.max_guests} pers.
          </span>
        </div>
      </div>
    </Link>
  );
}
