import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ServicesHeroSection } from "@/components/site/sections/services/hero/services-hero.section";
import { PanelsSection } from "@/components/site/sections/services/panels/panels.section";
import { routing } from "@/i18n/routing";
import { ogCard, pageAlternates } from "@/lib/page-metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/servicios">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta.services" });

  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: pageAlternates(locale, "/servicios"),
    openGraph: { title: t("title"), description: t("description"), images: ogCard(locale) },
  };
}

// The five trips, one panel each.
export default async function ServicesPage({ params }: PageProps<"/[locale]/servicios">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <ServicesHeroSection />
      <PanelsSection />
    </>
  );
}
