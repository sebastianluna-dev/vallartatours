import { useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { REVIEW_PORTRAITS, type Service } from "@/constants/services.const";
import { messageRecords } from "@/lib/message-records";
import "./reviews.section.css";
import { PHOTO_QUALITY } from "@/constants/site.const";

interface ReviewsProps {
  service: Service;
}

// Three quotes about the trip, all the same but for the middle one, which
// is the lime card. The portrait of that one is the trip's own; the others
// borrow from the portraits of the site.
export function ReviewsSection({ service }: ReviewsProps) {
  const t = useTranslations("service");
  const tCatalog = useTranslations(`catalog.${service.slug}`);
  const reviews = messageRecords(tCatalog.raw("reviews"), ["quote", "author", "meta"]);

  return (
    <section className="section reviews">
      <div className="section__inner">
        <h2 className="section-title reviews__title">{t("reviewsTitle")}</h2>
        <ul className="reviews__list">
          {reviews.map((review, index) => {
            const featured = index === 1;
            return (
              <Reveal
                as="li"
                key={review.author}
                className={["reviews__card", featured && "reviews__card_featured"].filter(Boolean).join(" ")}
                order={index}
              >
                <span className={["stars", featured && "stars_tone_navy"].filter(Boolean).join(" ")} aria-hidden="true">
                  ★★★★★
                </span>
                <blockquote className="reviews__quote">“{review.quote}”</blockquote>
                <div className="reviews__author">
                  <Image
                    className="reviews__avatar"
                    src={(featured ? service.reviewPhoto : REVIEW_PORTRAITS[index]).src}
                    alt=""
                    width={60}
                    height={60}
                    quality={PHOTO_QUALITY}
                  />
                  <div>
                    <div className="reviews__name">{review.author}</div>
                    <div className="reviews__meta">{review.meta}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
