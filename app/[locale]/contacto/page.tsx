import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/site/sections/contact/form/contact.section";
import { ContactHeroSection } from "@/components/site/sections/contact/hero/contact-hero.section";
import { routing } from "@/i18n/routing";
import { ogCard, pageAlternates } from "@/lib/page-metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/contacto">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta.contact" });

  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: pageAlternates(locale, "/contacto"),
    openGraph: { title: t("title"), description: t("description"), images: ogCard(locale) },
  };
}

// The form and the ways to reach the crew.
export default async function ContactPage({ params }: PageProps<"/[locale]/contacto">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <ContactHeroSection />
      <ContactSection />
    </>
  );
}
