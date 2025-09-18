import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";
import { poppins } from "./fonts";
import { Footer } from "@/components/site/sections/shell/footer/footer.section";
import { Header } from "@/components/site/sections/shell/header/header.section";
import { routing, type Locale } from "@/i18n/routing";
import { ogCard } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site-url";

const OG_LOCALES: Record<Locale, string> = { es: "es_MX", en: "en_US" };

// Every page is prerendered once per locale.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Site-wide defaults; every page sets its own title, description and
// alternates on top (see lib/page-metadata.ts).
export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("siteName"), template: `%s | ${t("siteName")}` },
    openGraph: {
      siteName: t("siteName"),
      type: "website",
      locale: OG_LOCALES[locale],
      images: ogCard(locale),
    },
    twitter: { card: "summary_large_image", images: ogCard(locale) },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // Lets the pages render statically: without it, reading the locale would
  // make every request dynamic.
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <html lang={locale} className={poppins.variable}>
      <body>
        {/* Nothing reveals without JavaScript, so the cards stay put. */}
        <noscript>
          <style>{".reveal { opacity: 1; transform: none; }"}</style>
        </noscript>
        <a className="skip-link" href="#contenido">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
