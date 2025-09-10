import type { MetadataRoute } from "next";
import { SERVICE_SLUGS } from "@/constants/services.const";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-url";

type Href = Parameters<typeof getPathname>[0]["href"];

// Every page in every language, each with its hreflang alternates.
const PAGES: { href: Href; priority: number }[] = [
  { href: "/", priority: 1 },
  { href: "/servicios", priority: 0.9 },
  { href: "/contacto", priority: 0.6 },
  ...SERVICE_SLUGS.map((slug) => ({
    href: { pathname: "/servicios/[slug]", params: { slug } } as Href,
    priority: 0.8,
  })),
];

function absolute(locale: Locale, href: Href): string {
  return `${SITE_URL}${getPathname({ locale, href })}`;
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
