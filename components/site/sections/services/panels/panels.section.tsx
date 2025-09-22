import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { AMENITY_ICONS, Icon } from "@/components/site/shared/icon.comp";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { SERVICES } from "@/constants/services.const";
import { Link } from "@/i18n/navigation";
import { formatIndex } from "@/lib/format-index";
import { formatPrice } from "@/lib/format-price";
import { serviceSlug } from "@/lib/service-slug";
import "./panels.section.css";
import { PHOTO_QUALITY } from "@/constants/site.const";

// One full-height panel per trip: its photo behind a veil, the number, the
// title, duration and price on the left, the amenities as chips on the right.
export function PanelsSection() {
  const t = useTranslations("services");
  const tService = useTranslations("service");
  const tCatalog = useTranslations("catalog");
  const locale = useLocale();

  return (
    <div className="panels" id="servicios">
      {SERVICES.map((service, index) => (
        <Reveal as="article" key={service.slug} className="section panels__panel">
          <Image
            className="panels__photo"
            src={service.photo.src}
            alt={tCatalog(`${service.slug}.photoAlt`)}
            fill
            sizes="100vw"
            quality={PHOTO_QUALITY}
          />
          <div className="panels__veil" />
          <div className="section__inner panels__inner">
            <div className="panels__main">
              <div className="panels__rail" aria-hidden="true">
                <span className="panels__number">{formatIndex(index)}</span>
                <span className="panels__line" />
              </div>
              <div className="panels__copy">
                <h2 className="panels__title">{tCatalog(`${service.slug}.name`)}</h2>
                <dl className="panels__facts">
                  <div className="panels__fact">
                    <dt>{t("duration")}</dt>
                    <dd>
                      {service.durationHours === null
                        ? tService("custom")
                        : tService("hours", { hours: service.durationHours })}
                    </dd>
                  </div>
                  <div className="panels__fact">
                    <dt>{t("priceFrom")}</dt>
                    <dd>
                      {service.price === null
                        ? tService("quote")
                        : tService("perPerson", { price: formatPrice(service.price, locale) })}
                    </dd>
                  </div>
                </dl>
                <Link
                  className="button panels__explore"
                  href={{ pathname: "/servicios/[slug]", params: { slug: serviceSlug(service, locale) } }}
                >
                  {t("explore")}
                  <Icon name="arrowRight" size={22} />
                </Link>
              </div>
            </div>
            <div className="panels__aside">
              <h3 className="panels__aside-title">{t("includes")}</h3>
              <ul className="panels__amenities">
                {service.amenities.map((amenity) => (
                  <li key={amenity} className="chip">
                    <Icon className="chip__icon" name={AMENITY_ICONS[amenity]} size={22} />
                    {tService(`amenities.${amenity}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
