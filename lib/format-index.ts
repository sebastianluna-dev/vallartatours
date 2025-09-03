// "01", "02"… for the service panels and the itinerary stops.
export function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}
