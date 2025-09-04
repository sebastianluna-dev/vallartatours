import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { HOME_SECTIONS } from "@/config/site.config";
import { routing } from "@/i18n/routing";
import { pageAlternates } from "@/lib/page-metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: pageAlternates(locale, "/"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

// The home, composed from the sections listed in config/site.config.ts.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return HOME_SECTIONS.map(({ id, Section }) => <Section key={id} />);
}
