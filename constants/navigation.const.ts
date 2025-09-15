import type { StaticPathname } from "@/i18n/routing";

// The three pages of the header, the phone menu and the footer. The labels
// come from the messages (`nav.<key>`).
export const NAV_ITEMS: readonly { key: "home" | "services" | "contact"; href: StaticPathname }[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/servicios" },
  { key: "contact", href: "/contacto" },
];

export type NavKey = (typeof NAV_ITEMS)[number]["key"];

// The two legal documents, shown twice in the footer (the column block and
// the bottom line). The labels come from `footer.<key>`.
export const LEGAL_LINKS: readonly { key: "terms" | "privacy"; href: StaticPathname }[] = [
  { key: "terms", href: "/terminos" },
  { key: "privacy", href: "/privacidad" },
];
