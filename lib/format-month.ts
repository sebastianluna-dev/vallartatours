import type { Locale } from "@/i18n/routing";
import { localeTag } from "./locale-tag";

// The name of a month (1-12) in the language being read: "diciembre",
// "December". Used for the season of a trip, which is stored as two numbers.
export function formatMonth(month: number, locale: Locale): string {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Expected a month between 1 and 12, got "${month}"`);
  }
  // Any year works; the day is fixed so no time zone can shift the month.
  return new Intl.DateTimeFormat(localeTag(locale), { month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(2001, month - 1, 15)),
  );
}
