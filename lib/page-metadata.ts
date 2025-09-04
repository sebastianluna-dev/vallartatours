import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type Href = Parameters<typeof getPathname>[0]["href"];

// Canonical and hreflang links of a page: the same route in every locale,
// with the localized pathnames of i18n/routing.ts. Spanish doubles as
// `x-default` because it is the locale without a prefix.
export function pageAlternates(locale: Locale, href: Href): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((candidate) => [candidate, getPathname({ locale: candidate, href })]),
  ) as Record<Locale, string>;

  return {
    canonical: languages[locale],
    languages: { ...languages, "x-default": languages[routing.defaultLocale] },
  };
}
