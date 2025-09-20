import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/site/shared/locale-switcher.comp";
import { Logo } from "@/components/site/shared/logo.comp";
import { MobileMenu } from "./mobile-menu.comp";
import { SiteNav } from "./site-nav.comp";
import "./header.section.css";

// Floats over the hero photo of every page: the wordmark, the pill nav and
// the language switch. On the phone the nav moves into the full-screen menu,
// which is also where "Reservar" lives.
export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="section header">
      <div className="section__inner header__inner">
        <Logo />
        <SiteNav className="header__nav" ariaLabel={t("label")} />
        <div className="header__tools">
          <LocaleSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
