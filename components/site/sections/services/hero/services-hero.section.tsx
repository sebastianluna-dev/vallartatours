import { useTranslations } from "next-intl";
import { Icon } from "@/components/site/shared/icon.comp";
import { PageHero } from "@/components/site/shared/page-hero.comp";

// The yacht photo with the invitation to scroll down to the five panels.
export function ServicesHeroSection() {
  const t = useTranslations("services");

  return (
    <PageHero photo="/images/hero-servicios.jpg" photoAlt={t("photoAlt")} title={t("title")} lead={t("lead")}>
      <a className="page-hero__scroll" href="#servicios" aria-label={t("scroll")}>
        <Icon name="arrowDown" size={30} />
      </a>
      <span className="page-hero__scroll-label" aria-hidden="true">
        {t("scroll")}
      </span>
    </PageHero>
  );
}
