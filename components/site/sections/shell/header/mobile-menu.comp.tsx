"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Icon } from "@/components/site/shared/icon.comp";
import { LocaleSwitcher } from "@/components/site/shared/locale-switcher.comp";
import { Logo } from "@/components/site/shared/logo.comp";
import { SITE } from "@/constants/site.const";
import { BookButton } from "./book-button.comp";
import { SiteNav } from "./site-nav.comp";
import "./mobile-menu.comp.css";

// Full-screen menu of the phone. A native modal <dialog>: the browser traps
// the focus, closes it with Escape and the page behind it stops scrolling
// (globals.css). The whole block is hidden on the desktop breakpoints.
export function MobileMenu() {
  const t = useTranslations("nav");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <div className="mobile-menu">
      <button type="button" className="mobile-menu__toggle" aria-label={t("openMenu")} onClick={open}>
        <Icon name="menu" size={20} />
      </button>

      <dialog ref={dialogRef} className="mobile-menu__panel" aria-label={t("menu")}>
        <div className="mobile-menu__bar">
          <Logo onNavigate={close} />
          <div className="mobile-menu__tools">
            <LocaleSwitcher />
            <button type="button" className="mobile-menu__close" aria-label={t("closeMenu")} onClick={close}>
              <Icon name="cross" size={20} />
            </button>
          </div>
        </div>

        <SiteNav className="mobile-menu__nav" ariaLabel={t("label")} variant="list" onNavigate={close} />

        <BookButton className="mobile-menu__book" label="bookNow" onNavigate={close} />
        <p className="mobile-menu__contact">
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a> ·{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </dialog>
    </div>
  );
}
