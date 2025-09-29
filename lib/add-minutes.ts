/**
 * A time of day ("HH:MM", 24 h) moved forward by so many minutes: the
 * charter has no fixed schedule, so its stops are minutes from whatever
 * departure the visitor picks. It wraps past midnight, which the longest
 * trip of the evening needs.
 */
export function addMinutes(time: string, minutes: number): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) throw new Error(`Expected a time as "HH:MM", got "${time}"`);
  if (!Number.isInteger(minutes)) throw new Error(`Expected whole minutes, got "${minutes}"`);
  const total = Number(match[1]) * 60 + Number(match[2]) + minutes;
  const wrapped = ((total % 1440) + 1440) % 1440;
  const hours = Math.floor(wrapped / 60);
  return `${String(hours).padStart(2, "0")}:${String(wrapped % 60).padStart(2, "0")}`;
}
