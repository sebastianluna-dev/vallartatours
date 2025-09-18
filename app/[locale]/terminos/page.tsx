import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LegalDocumentSection } from "@/components/site/sections/legal/document/legal-document.section";
import { routing } from "@/i18n/routing";
import { ogCard, pageAlternates } from "@/lib/page-metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/terminos">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta.terms" });

  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: pageAlternates(locale, "/terminos"),
    openGraph: { title: t("title"), description: t("description"), images: ogCard(locale) },
  };
}

// The rules of a booking, linked from the footer.
export default async function TermsPage({ params }: PageProps<"/[locale]/terminos">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <LegalDocumentSection doc="terms" />;
}
