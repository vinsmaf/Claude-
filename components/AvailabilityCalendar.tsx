"use client";
import { useState } from "react";

interface Props {
  bookedDates: string[];
  onSelect: (checkIn: string, checkOut: string) => void;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];

export default function AvailabilityCalendar({ bookedDates, onSelect }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const booked = new Set(bookedDates);
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0
  const days = daysInMonth(year, month);

  function handleDay(d: number) {
    const iso = toISO(year, month, d);
    if (booked.has(iso)) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(iso);
      setCheckOut("");
    } else if (iso > checkIn) {
      setCheckOut(iso);
      onSelect(checkIn, iso);
    } else {
      setCheckIn(iso);
      setCheckOut("");
    }
  }

  function inRange(iso: string) {
    return checkIn && checkOut && iso > checkIn && iso < checkOut;
  }

  function prev() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function next() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  return (
    <div className="rounded-xl border border-gray-200 p-4 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="p-1 hover:bg-gray-100 rounded-lg">‹</button>
        <span className="font-semibold text-sm">{MONTHS[month]} {year}</span>
        <button onClick={next} className="p-1 hover:bg-gray-100 rounded-lg">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
        {DAYS.map(d => <span key={d}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {Array.from({ length: firstDay }).map((_, i) => <span key={`e${i}`} />)}
        {Array.from({ length: days }, (_, i) => i + 1).map(d => {
          const iso = toISO(year, month, d);
          const isBooked = booked.has(iso);
          const isStart = iso === checkIn;
          const isEnd = iso === checkOut;
          const isPast = iso < today.toISOString().split("T")[0];
          return (
            <button
              key={d}
              disabled={isBooked || isPast}
              onClick={() => handleDay(d)}
              className={[
                "rounded-lg py-1 text-xs font-medium transition-colors",
                isBooked || isPast ? "text-gray-300 cursor-not-allowed" : "hover:bg-amber-50",
                isStart || isEnd ? "bg-amber-500 text-white hover:bg-amber-500" : "",
                inRange(iso) ? "bg-amber-100 text-amber-800" : "",
              ].filter(Boolean).join(" ")}
            >
              {d}
            </button>
          );
        })}
      </div>
      {checkIn && (
        <p className="mt-3 text-xs text-gray-500 text-center">
          {checkIn} → {checkOut || "…"}
        </p>
      )}
    </div>
  );
}
