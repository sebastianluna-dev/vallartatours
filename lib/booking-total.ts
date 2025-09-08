// What the booking card prints: the sum for the group and the deposit that
// holds the spots. Rounded to the peso the way the crew charges it.
export interface BookingTotal {
  total: number;
  deposit: number;
}

export function bookingTotal(pricePerPerson: number, people: number, depositRate: number): BookingTotal {
  if (people < 1 || !Number.isInteger(people)) throw new Error("Expected a whole number of people, at least one");
  const total = pricePerPerson * people;
  return { total, deposit: Math.round(total * depositRate) };
}
