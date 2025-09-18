"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { findServiceBySlug, serviceSlug } from "@/lib/service-slug";
import "./locale-switcher.comp.css";

// "ES / EN": the same page in the other language. `usePathname` returns the
// internal route (`/servicios/[slug]`) and `useParams` its parameters, so the
// link lands on the translated URL of the page the visitor is reading.
export function LocaleSwitcher() {
  const current = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const params = useParams();

  // The slug of a trip is not the same in both languages, so the one in the
  // URL is read back to its trip and written again for the language of each
  // link. Every other route carries its parameters as they are.
  const paramsFor = (locale: Locale) => {
    if (pathname !== "/servicios/[slug]") return params;
    const service = findServiceBySlug(String(params.slug), current);
    return service ? { ...params, slug: serviceSlug(service, locale) } : params;
  };

  return (
    <nav className="locale-switcher" aria-label={t("language")}>
      {routing.locales.map((locale, index) => (
        <span key={locale} className="locale-switcher__item">
          {index > 0 && (
            <span className="locale-switcher__separator" aria-hidden="true">
              /
            </span>
          )}
          <Link
            className={["locale-switcher__link", locale === current && "locale-switcher__link_active"]
              .filter(Boolean)
              .join(" ")}
            // @ts-expect-error -- the params always match the current route,
            // so the pairing next-intl validates at the type level holds.
            href={{ pathname, params: paramsFor(locale) }}
            locale={locale}
            hrefLang={locale}
            aria-current={locale === current ? "page" : undefined}
          >
            {locale}
          </Link>
        </span>
      ))}
    </nav>
  );
}
