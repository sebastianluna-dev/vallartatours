import type { StaticPathname } from "@/i18n/routing";

// The three pages of the header, the phone menu and the footer. The labels
// come from the messages (`nav.<key>`).
export const NAV_ITEMS: readonly { key: "home" | "services" | "contact"; href: StaticPathname }[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/servicios" },
  { key: "contact", href: "/contacto" },
];

export type NavKey = (typeof NAV_ITEMS)[number]["key"];
