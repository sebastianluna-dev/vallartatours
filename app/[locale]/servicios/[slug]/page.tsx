import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { FaqSection } from "@/components/site/sections/service/faq/faq.section";
import { ServiceHeroSection } from "@/components/site/sections/service/hero/service-hero.section";
import { IncludedSection } from "@/components/site/sections/service/included/included.section";
import { ItinerarySection } from "@/components/site/sections/service/itinerary/itinerary.section";
import { ReviewsSection } from "@/components/site/sections/service/reviews/reviews.section";
import { ServiceCarousel } from "@/components/site/shared/service-carousel.comp";
import { SERVICES } from "@/constants/services.const";
import { routing } from "@/i18n/routing";
import { pageAlternates } from "@/lib/page-metadata";
import { findServiceBySlug, serviceSlug } from "@/lib/service-slug";

type Props = PageProps<"/[locale]/servicios/[slug]">;

// Every trip in every language is prerendered, each under the segment its
// language uses (`avistamiento-de-ballenas`, `whale-watching`).
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICES.map((service) => ({ locale, slug: serviceSlug(service, locale) })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const service = findServiceBySlug(slug, locale);
  if (!service) notFound();
  const t = await getTranslations({ locale, namespace: "meta.service" });
  const tCatalog = await getTranslations({ locale, namespace: `catalog.${service.slug}` });
  const title = t("title", { name: tCatalog("name") });

  return {
    title: { absolute: title },
    description: tCatalog("short"),
    // The same trip in the other language lives under its own segment.
    alternates: pageAlternates(locale, (candidate) => ({
      pathname: "/servicios/[slug]",
      params: { slug: serviceSlug(service, candidate) },
    })),
    openGraph: { title, description: tCatalog("short"), images: [{ url: service.photo.src }] },
  };
}

// One trip: hero with the booking card, the itinerary, what is included,
// the reviews, the questions and the other four trips.
export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const service = findServiceBySlug(slug, locale);
  if (!service) notFound();
  const t = await getTranslations("service");
  const others = SERVICES.filter((candidate) => candidate.slug !== service.slug);

  return (
    <>
      <ServiceHeroSection service={service} />
      <ItinerarySection slug={service.slug} />
      <IncludedSection service={service} />
      <ReviewsSection service={service} />
      <FaqSection slug={service.slug} />
      <ServiceCarousel services={others} eyebrow={t("others")} place="detail" />
    </>
  );
}
