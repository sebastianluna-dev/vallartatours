"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@/components/site/shared/icon.comp";
import { Link, usePathname } from "@/i18n/navigation";

interface BookButtonProps {
  className?: string;
  size?: "small" | "regular";
  /** "now" for the phone menu's "Reservar ahora". */
  label?: "book" | "bookNow";
  onNavigate?: () => void;
}

// "Reservar" in the header and the phone menu. On a detail page it scrolls
// to the booking card; anywhere else it goes to the services, where the
// visitor picks a trip first.
export function BookButton({ className, size = "regular", label = "book", onNavigate }: BookButtonProps) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const classes = ["button", size === "small" && "button_size_small", className].filter(Boolean).join(" ");
  const content = (
    <>
      {label === "bookNow" && <Icon name="calendar" size={19} />}
      {t(label)}
      {label === "book" && <Icon name="bookmark" size={size === "small" ? 17 : 19} />}
    </>
  );

  if (pathname === "/servicios/[slug]") {
    return (
      <a className={classes} href="#reservar" onClick={onNavigate}>
        {content}
      </a>
    );
  }
  return (
    <Link className={classes} href="/servicios" onClick={onNavigate}>
      {content}
    </Link>
  );
}
