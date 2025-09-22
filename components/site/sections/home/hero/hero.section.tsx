import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { HERO_FACES } from "@/constants/services.const";
import { FIGURES, PHOTO_QUALITY } from "@/constants/site.const";
import { formatNumber } from "@/lib/format-price";
import { BookingSearch } from "./booking-search.comp";
import "./hero.section.css";

// The beach photo under the header, the rating badge, the claim, the
// availability search and the "9,754 viajeros" line.
export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="section hero" id="inicio">
      {/* The photograph and its veils; the section can grow past this layer
          and show its own navy underneath (see `--hero-skirt`). */}
      <div className="hero__media">
        <Image
          className="hero__photo"
          src="/images/hero-playa.jpg"
          alt={t("photoAlt")}
          fill
          priority
          sizes="100vw"
          quality={PHOTO_QUALITY}
        />
        <div className="hero__veil" />
        <div className="hero__fade" />
      </div>

      <div className="section__inner hero__inner">
        <div className="hero__copy">
          <span className="hero__badge">
            <span className="hero__badge-star" aria-hidden="true">
              ★
            </span>
            {t("rating", { rating: FIGURES.rating, reviews: FIGURES.reviews })}
          </span>
          <h1 className="hero__title">{t.rich("title", { br: () => <br /> })}</h1>
          <p className="hero__lead">{t("lead")}</p>
        </div>

        <div className="hero__foot">
          <BookingSearch />
          <p className="hero__travelers">
            <span className="hero__faces" aria-hidden="true">
              {HERO_FACES.map((face) => (
                <Image
                  key={face.src}
                  className="hero__face"
                  src={face.src}
                  alt=""
                  width={40}
                  height={40}
                  quality={PHOTO_QUALITY}
                />
              ))}
            </span>
            <span>
              {t.rich("travelers", {
                count: formatNumber(FIGURES.travelers, locale),
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
