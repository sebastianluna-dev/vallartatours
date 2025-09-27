import { useTranslations } from "next-intl";
import Image from "next/image";
import { Suspense } from "react";
import type { Service } from "@/constants/services.const";
import { BookingAside, BookingAsideFromQuery } from "./booking-aside.comp";
import "./service-hero.section.css";
import { PHOTO_QUALITY } from "@/constants/site.const";

interface ServiceHeroProps {
  service: Service;
}

// The trip's photo with the season badge, the title, the blurb and the
// facts on the left and the booking card on the right. The card reads the
// query string, so it renders on the client inside a Suspense boundary.
export function ServiceHeroSection({ service }: ServiceHeroProps) {
  const t = useTranslations("service");
  const tCatalog = useTranslations(`catalog.${service.slug}`);

  const facts = [
    service.durationHours === null ? t("custom") : t("hours", { hours: service.durationHours }),
    service.groupSize === null ? null : t("group", { size: service.groupSize }),
    t(`port.${service.port}`),
  ].filter((fact): fact is string => fact !== null);

  return (
    <section className="section service-hero">
      {/* The photograph and its veil; on the phone this layer stops just past
          the top of the booking card (see `service-hero.section.css`). */}
      <div className="service-hero__media">
        <Image
          className="service-hero__photo"
          src={service.photo.src}
          alt={tCatalog("photoAlt")}
          fill
          priority
          sizes="100vw"
          quality={PHOTO_QUALITY}
        />
        <div className="service-hero__veil" />
      </div>
      <div className="section__inner service-hero__inner">
        <div className="service-hero__copy">
          <span className="service-hero__badge">{tCatalog("badge")}</span>
          <h1 className="service-hero__title">{tCatalog("name")}</h1>
          <p className="service-hero__blurb">{tCatalog("blurb")}</p>
          <ul className="service-hero__facts">
            {facts.map((fact) => (
              <li key={fact} className="chip">
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <Suspense fallback={<BookingAside service={service} />}>
          <BookingAsideFromQuery service={service} />
        </Suspense>
      </div>
    </section>
  );
}
