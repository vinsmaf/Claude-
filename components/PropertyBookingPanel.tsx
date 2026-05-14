"use client";
import { useState } from "react";
import AvailabilityCalendar from "./AvailabilityCalendar";
import BookingForm from "./BookingForm";

interface Props {
  propertyId: string;
  pricePerNight: number;
  bookedDates: string[];
}

export default function PropertyBookingPanel({ propertyId, pricePerNight, bookedDates }: Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <div className="space-y-6">
      <AvailabilityCalendar
        bookedDates={bookedDates}
        onSelect={(ci, co) => { setCheckIn(ci); setCheckOut(co); }}
      />
      {checkIn && checkOut && (
        <BookingForm
          propertyId={propertyId}
          pricePerNight={pricePerNight}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      )}
      {!checkIn && (
        <p className="text-sm text-gray-400 text-center">
          Sélectionnez vos dates d&apos;arrivée et de départ.
        </p>
      )}
    </div>
  );
}
