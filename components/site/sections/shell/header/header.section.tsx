import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/site/shared/locale-switcher.comp";
import { Logo } from "@/components/site/shared/logo.comp";
import { MobileMenu } from "./mobile-menu.comp";
import { SiteNav } from "./site-nav.comp";
import "./header.section.css";

// Floats over the hero photo of every page: the wordmark, the pill nav and
// the language switch. On the phone both move into the full-screen menu,
// which is also where "Reservar" lives; only the wordmark and the button
// that opens it stay on the bar.
export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="section header">
      <div className="section__inner header__inner">
        <Logo />
        <SiteNav className="header__nav" ariaLabel={t("label")} />
        <div className="header__tools">
          <LocaleSwitcher className="header__locale" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
