import type { Locale } from "@/i18n/routing";

// BCP 47 tags for `Intl`: the site's Spanish is Mexican (comma as the
// thousands separator, "$" for pesos).
const LOCALE_TAGS: Record<Locale, string> = { es: "es-MX", en: "en-US" };

export function localeTag(locale: Locale): string {
  return LOCALE_TAGS[locale];
}
