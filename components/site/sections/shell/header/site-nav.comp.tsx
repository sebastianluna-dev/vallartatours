"use client";

import { useTranslations } from "next-intl";
import { NAV_ITEMS } from "@/constants/navigation.const";
import { Link, usePathname } from "@/i18n/navigation";
import type { Pathname } from "@/i18n/routing";
import "./site-nav.comp.css";

interface SiteNavProps {
  className?: string;
  ariaLabel: string;
  /** Called when a link is followed; the phone menu closes itself with it. */
  onNavigate?: () => void;
  variant?: "pill" | "list";
}

/** The detail pages belong to the "Servicios" item. */
function isActive(item: Pathname, current: Pathname): boolean {
  if (item === "/") return current === "/";
  return current === item || current.startsWith(`${item}/`);
}

// The three pages. The active one is the lime pill on the desktop and the
// lime line in the phone menu; `usePathname` gives the internal route, so
// the detail pages light up "Servicios" too.
export function SiteNav({ className, ariaLabel, onNavigate, variant = "pill" }: SiteNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav
      className={["site-nav", `site-nav_variant_${variant}`, className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href, pathname);
        return (
          <Link
            key={item.key}
            className={["site-nav__link", active && "site-nav__link_active"].filter(Boolean).join(" ")}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
          >
            {t(item.key)}
          </Link>
        );
      })}
    </nav>
  );
}
