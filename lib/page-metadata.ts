import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type Href = Parameters<typeof getPathname>[0]["href"];
/** For the pages whose URL carries a segment that changes with the language. */
type HrefFor = (locale: Locale) => Href;

/** Alt of the card; the same text the route of `app/og/[locale]` draws. */
const OG_CARD_ALT = "Vallarta WKND · Bahía de Banderas";

/**
 * The social card of the language, as `openGraph.images` wants it. Next does
 * not inherit `openGraph` from the layout when a page writes its own, so
 * every page that has no photo of its own names the card here.
 */
export function ogCard(locale: Locale): NonNullable<NonNullable<Metadata["openGraph"]>["images"]> {
  return [{ url: `/og/${locale}`, width: 1200, height: 630, alt: OG_CARD_ALT, type: "image/png" }];
}

// Canonical and hreflang links of a page: the same route in every locale,
// with the localized pathnames of i18n/routing.ts. Spanish doubles as
// `x-default` because it is the locale without a prefix.
export function pageAlternates(locale: Locale, href: Href | HrefFor): Metadata["alternates"] {
  const hrefFor: HrefFor = typeof href === "function" ? href : () => href;
  const languages = Object.fromEntries(
    routing.locales.map((candidate) => [candidate, getPathname({ locale: candidate, href: hrefFor(candidate) })]),
  ) as Record<Locale, string>;

  return {
    canonical: languages[locale],
    languages: { ...languages, "x-default": languages[routing.defaultLocale] },
  };
}
