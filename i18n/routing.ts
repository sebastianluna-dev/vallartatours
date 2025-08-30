import { defineRouting } from "next-intl/routing";

// Spanish is the default and lives at the root (`/`); English at `/en`. The
// keys of `pathnames` are the internal routes (the folders under app/[locale]);
// every locale shows them as they are for now.
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/servicios": "/servicios",
    "/servicios/[slug]": "/servicios/[slug]",
    "/contacto": "/contacto",
  },
});

export type Locale = (typeof routing.locales)[number];

/** Internal route keys, as `usePathname` and `Link` know them. */
export type Pathname = keyof typeof routing.pathnames;

/** The routes without parameters: what a plain `href` can point to. */
export type StaticPathname = Exclude<Pathname, `${string}[${string}`>;
