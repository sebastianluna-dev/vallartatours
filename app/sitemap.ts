import type { MetadataRoute } from "next";
import { SERVICES } from "@/constants/services.const";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { serviceSlug } from "@/lib/service-slug";
import { SITE_URL } from "@/lib/site-url";

type Href = Parameters<typeof getPathname>[0]["href"];
/** The detail pages carry a segment that changes with the language. */
type HrefFor = (locale: Locale) => Href;

// Every page in every language, each with its hreflang alternates.
const PAGES: { href: HrefFor; priority: number }[] = [
  { href: () => "/", priority: 1 },
  { href: () => "/servicios", priority: 0.9 },
  { href: () => "/contacto", priority: 0.6 },
  ...SERVICES.map((service) => ({
    href: ((locale) => ({ pathname: "/servicios/[slug]", params: { slug: serviceSlug(service, locale) } })) as HrefFor,
    priority: 0.8,
  })),
  { href: () => "/terminos", priority: 0.2 },
  { href: () => "/privacidad", priority: 0.2 },
];

function absolute(locale: Locale, href: HrefFor): string {
  return `${SITE_URL}${getPathname({ locale, href: href(locale) })}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ href, priority }) => {
    const languages = Object.fromEntries(routing.locales.map((locale) => [locale, absolute(locale, href)]));
    return routing.locales.map((locale) => ({
      url: absolute(locale, href),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
