import { defineRouting } from "next-intl/routing";

// Spanish is the default and lives at the root (`/`); English at `/en`. The
// keys of `pathnames` are the internal routes (the folders under app/[locale])
// and the values the URL each locale shows for them.
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/servicios": { es: "/servicios", en: "/services" },
    "/servicios/[slug]": { es: "/servicios/[slug]", en: "/services/[slug]" },
    "/contacto": { es: "/contacto", en: "/contact" },
    "/terminos": { es: "/terminos", en: "/terms" },
    "/privacidad": { es: "/privacidad", en: "/privacy" },
  },
});

export type Locale = (typeof routing.locales)[number];

/** Internal route keys, as `usePathname` and `Link` know them. */
export type Pathname = keyof typeof routing.pathnames;

/** The routes without parameters: what a plain `href` can point to. */
export type StaticPathname = Exclude<Pathname, `${string}[${string}`>;
