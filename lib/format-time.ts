// "08:00" → "8:00 am", "15:00" → "3:00 pm": the departure times are stored
// in 24 h and the copy shows them the way the crew says them.
export function formatTime(time: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) throw new Error(`Expected a time as "HH:MM", got "${time}"`);
  const hours = Number(match[1]);
  const suffix = hours < 12 ? "am" : "pm";
  const twelve = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelve}:${match[2]} ${suffix}`;
}
