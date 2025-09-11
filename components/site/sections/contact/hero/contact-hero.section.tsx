import { useTranslations } from "next-intl";
import { PageHero } from "@/components/site/shared/page-hero.comp";

// The night beach photo with the title and the opening hours.
export function ContactHeroSection() {
  const t = useTranslations("contact");

  return (
    <PageHero
      photo="/images/hero-contacto.jpg"
      photoAlt={t("photoAlt")}
      title={t("title")}
      lead={t("lead")}
      size="short"
    />
  );
}
