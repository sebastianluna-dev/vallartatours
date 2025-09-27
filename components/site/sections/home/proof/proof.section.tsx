import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { REVIEW_PORTRAITS, PROOF_PHOTO } from "@/constants/services.const";
import { FIGURES, PHOTO_QUALITY } from "@/constants/site.const";
import { formatNumber } from "@/lib/format-price";
import { messageRecords } from "@/lib/message-records";
import "./proof.section.css";

// The figures and four reviews: two white cards with a photo, two glass
// quotes with a portrait, the "96%" lime card and a loose photograph.
export function ProofSection() {
  const t = useTranslations("home.proof");
  const locale = useLocale();
  const reviews = messageRecords(t.raw("reviews"), ["quote", "author", "trip"]);
  const [first, second, third, fourth] = reviews;

  return (
    <section className="section proof">
      <div className="section__inner proof__inner">
        <div className="proof__lead">
          <h2 className="section-title proof__title">{t.rich("title", { br: () => <br /> })}</h2>
          <dl className="proof__figures">
            <div className="proof__figure proof__figure_tone_lime">
              <dd>{formatNumber(FIGURES.travelers, locale)}</dd>
              <dt>{t("travelers")}</dt>
            </div>
            <div className="proof__figure proof__figure_tone_sky">
              <dd>{formatNumber(FIGURES.tours, locale)}</dd>
              <dt>{t("tours")}</dt>
            </div>
            <div className="proof__figure proof__figure_tone_sky">
              <dd>{FIGURES.years}</dd>
              <dt>{t("years")}</dt>
            </div>
            <div className="proof__figure">
              <dd>{FIGURES.rating}★</dd>
              <dt>{t("reviewsCount", { count: FIGURES.reviews })}</dt>
            </div>
          </dl>
          <Reveal as="blockquote" className="proof__card proof__card_style_photo">
            <Image
              className="proof__card-photo"
              src={REVIEW_PORTRAITS[0].src}
              alt=""
              width={178}
              height={356}
              quality={PHOTO_QUALITY}
            />
            <div className="proof__card-body">
              <span className="stars stars_tone_navy" aria-hidden="true">
                ★★★★★
              </span>
              <p className="proof__quote">“{first.quote}”</p>
              <footer className="proof__author">
                {first.author} · {first.trip}
              </footer>
            </div>
          </Reveal>
        </div>

        <div className="proof__grid">
          <Reveal as="blockquote" className="proof__card proof__card_style_photo proof__card_span_2">
            <Image
              className="proof__card-photo"
              src={REVIEW_PORTRAITS[1].src}
              alt=""
              width={178}
              height={356}
              quality={PHOTO_QUALITY}
            />
            <div className="proof__card-body">
              <span className="stars stars_tone_navy" aria-hidden="true">
                ★★★★★
              </span>
              <p className="proof__quote">“{second.quote}”</p>
              <footer className="proof__author">
                {second.author} · {second.trip}
              </footer>
            </div>
          </Reveal>
          <Image
            className="proof__photo"
            src={PROOF_PHOTO.src}
            alt={t("photoAlt")}
            width={178}
            height={356}
            quality={PHOTO_QUALITY}
          />
          <div className="proof__figure proof__figure_tone_lime proof__figure_size_large">
            <dd>{FIGURES.returning}%</dd>
            <dt>{t("returning")}</dt>
          </div>
          <Reveal as="blockquote" className="proof__card proof__card_style_glass proof__card_span_2" order={1}>
            <Image
              className="proof__avatar"
              src={REVIEW_PORTRAITS[2].src}
              alt=""
              width={64}
              height={64}
              quality={PHOTO_QUALITY}
            />
            <div>
              <p className="proof__quote">“{third.quote}”</p>
              <footer className="proof__author">
                {third.author} · {third.trip}
              </footer>
            </div>
          </Reveal>
          <Reveal as="blockquote" className="proof__card proof__card_style_glass proof__card_span_2" order={2}>
            <Image
              className="proof__avatar"
              src={REVIEW_PORTRAITS[3].src}
              alt=""
              width={64}
              height={64}
              quality={PHOTO_QUALITY}
            />
            <div>
              <p className="proof__quote">“{fourth.quote}”</p>
              <footer className="proof__author">
                {fourth.author} · {fourth.trip}
              </footer>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
