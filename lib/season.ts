import type { Service } from "@/constants/services.const";

type Season = NonNullable<Service["season"]>;

/**
 * Whether a month (1-12) falls inside a season. Seasons are stored as the
 * first and the last month they run, and the whales' runs across the end of
 * the year (December to March), so the range wraps.
 */
export function isMonthInSeason(season: Season, month: number): boolean {
  if (season.from <= season.to) return month >= season.from && month <= season.to;
  return month >= season.from || month <= season.to;
}

/**
 * Whether the date the booking card holds ("YYYY-MM-DD", the value of a date
 * input) falls inside the season. A trip without a season runs all year, so
 * every date is good; an empty or malformed date is not a complaint either,
 * the card has nothing to warn about yet.
 */
export function isDateInSeason(season: Season | null, date: string): boolean {
  if (season === null) return true;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return true;
  return isMonthInSeason(season, Number(match[2]));
}
