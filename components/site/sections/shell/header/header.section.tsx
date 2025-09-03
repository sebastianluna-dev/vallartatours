import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/site/shared/locale-switcher.comp";
import { Logo } from "@/components/site/shared/logo.comp";
import { BookButton } from "./book-button.comp";
import { MobileMenu } from "./mobile-menu.comp";
import { SiteNav } from "./site-nav.comp";
import "./header.section.css";

// Floats over the hero photo of every page: the wordmark, the pill nav, the
// language switch and the "Reservar" button. On the phone the nav and the
// button move into the full-screen menu.
export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="section header">
      <div className="section__inner header__inner">
        <Logo />
        <SiteNav className="header__nav" ariaLabel={t("label")} />
        <div className="header__tools">
          <LocaleSwitcher />
          <BookButton className="header__book" size="small" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
