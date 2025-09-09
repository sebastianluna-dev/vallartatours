import { useTranslations } from "next-intl";
import Image from "next/image";
import type { Service } from "@/constants/services.const";
import { messageRecords } from "@/lib/message-records";
import "./reviews.section.css";

interface ReviewsProps {
  service: Service;
}

// Three quotes about the trip; the middle one is the lime card with the
// traveller's portrait.
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
              <li
                key={review.author}
                className={["reviews__card", featured && "reviews__card_featured"].filter(Boolean).join(" ")}
              >
                <span className={["stars", featured && "stars_tone_navy"].filter(Boolean).join(" ")} aria-hidden="true">
                  ★★★★★
                </span>
                <blockquote className="reviews__quote">“{review.quote}”</blockquote>
                <div className="reviews__author">
                  {featured && (
                    <Image className="reviews__avatar" src={service.reviewPhoto.src} alt="" width={60} height={60} />
                  )}
                  <div>
                    <div className="reviews__name">{review.author}</div>
                    <div className="reviews__meta">{review.meta}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
