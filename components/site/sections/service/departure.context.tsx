"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface Departure {
  /** The time of the booking card, 24 h "HH:MM". */
  time: string;
  setTime: (time: string) => void;
}

const DepartureContext = createContext<Departure | null>(null);

// The hour the booking card of a trip holds. The itinerary of the charter
// reads it to put a clock on every stop, and the card is the one that
// writes it, so it lives above the two of them.
export function DepartureProvider({ initial, children }: { initial: string; children: ReactNode }) {
  const [time, setTime] = useState(initial);
  const value = useMemo(() => ({ time, setTime }), [time]);

  return <DepartureContext.Provider value={value}>{children}</DepartureContext.Provider>;
}

export function useDeparture(): Departure {
  const departure = useContext(DepartureContext);
  if (!departure) throw new Error("useDeparture needs a DepartureProvider above it");
  return departure;
}
