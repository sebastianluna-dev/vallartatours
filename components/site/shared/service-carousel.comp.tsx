"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import type { Service } from "@/constants/services.const";
import { useCarousel } from "@/hooks/use-carousel.hook";
import { useInView } from "@/hooks/use-in-view.hook";
import { useReveal } from "@/hooks/use-reveal.hook";
import { Link } from "@/i18n/navigation";
import { DECK_LAPS, deckSlot, isDeckSlotVisible, signedOffset } from "@/lib/carousel-offsets";
import { formatPrice } from "@/lib/format-price";
import { serviceSlug } from "@/lib/service-slug";
import { Icon } from "./icon.comp";
import { Reveal } from "./reveal.comp";
import "./service-carousel.comp.css";
import { PHOTO_QUALITY } from "@/constants/site.const";

interface ServiceCarouselProps {
  services: readonly Service[];
  /** Small lime caption over the title ("Otros servicios" on a detail page). */
  eyebrow?: string;
  initial?: number;
  /** "detail" adds the gap that separates it from the FAQ above. */
  place?: "home" | "detail";
}

/** How far the phone cards shrink and fade by distance from the active one. */
const PHONE_SCALE = [1, 0.84, 0.68];
const PHONE_FADE = [1, 0.8, 0.45];
/** The copies of the deck, one per lap; the phone only ever shows the first. */
const LAPS = Array.from({ length: DECK_LAPS }, (_, lap) => lap);
/**
 * How long the cards take to arrive, the longest delay included. Once it has
 * passed the deck stops offering the entrance: from then on a move is only
 * the slide of the stack.
 */
const ENTRANCE_MS = 900;
/** Half the section on screen is enough for the arrow keys to drive it. */
const KEYS_THRESHOLD = 0.5;

// The service picker. Desktop: the active trip's photo fills the stage, its
// copy sits on the left and the next three trips stack diagonally on the
// right; the arrows and a click on a card move the stack. Phone: the cards
// fan out around the active one, with dots and a swipe. One DOM for both:
// every card carries its desktop slot and its phone distance as CSS
// variables and the stylesheet picks one per breakpoint.
//
// Each trip is rendered `DECK_LAPS` times so the desktop stack can move in
// one direction: the card that leaves keeps walking off the left edge while
// another copy of the same trip comes in from the right, instead of one card
// sliding backwards across the others. The phone hides every copy but the
// first and fans those out as before.
export function ServiceCarousel({ services, eyebrow, initial = 0, place = "home" }: ServiceCarouselProps) {
  const t = useTranslations("service");
  const tCommon = useTranslations("common");
  const tCatalog = useTranslations("catalog");
  const locale = useLocale();
  const count = services.length;
  const { active, cursor, loaded, select, next, prev, swipeHandlers } = useCarousel(count, initial);
  const current = services[active];
  // The cards arrive one after another the first time the deck is on screen;
  // after that a move is the slide of the stack and nothing else.
  // While half the section is on screen the arrow keys move the stack, the
  // way they would inside a gallery.
  const [sectionRef, sectionInView] = useInView<HTMLElement>(KEYS_THRESHOLD);
  useEffect(() => {
    if (!sectionInView) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      // Not while someone is filling in the search of the hero or a date.
      if (target?.isContentEditable || target?.closest("input, select, textarea")) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      if (event.key === "ArrowRight") next();
      else prev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev, sectionInView]);

  const [copyRef, copyInView] = useReveal<HTMLDivElement>();
  const [deckRef, deckInView] = useReveal<HTMLDivElement>();
  const [entranceDone, setEntranceDone] = useState(false);
  useEffect(() => {
    if (!deckInView || entranceDone) return;
    const timer = setTimeout(() => setEntranceDone(true), ENTRANCE_MS);
    return () => clearTimeout(timer);
  }, [deckInView, entranceDone]);
  // "waiting" holds the cards back until the deck is on screen, so they are
  // never seen sitting there before they arrive.
  const entrance = !deckInView ? "waiting" : entranceDone ? "done" : "playing";

  const priceOf = (service: Service) => (service.price === null ? t("quote") : formatPrice(service.price, locale));
  const metaOf = (service: Service) =>
    service.price === null || service.durationHours === null
      ? t("metaPrivate")
      : t("meta", { hours: service.durationHours, price: formatPrice(service.price, locale) });

  return (
    <section
      ref={sectionRef}
      className={`section service-carousel service-carousel_place_${place}`}
      aria-roledescription="carousel"
      aria-label={eyebrow ?? t("others")}
    >
      <div className="service-carousel__stage" aria-hidden="true">
        {services.map((service, index) =>
          loaded.includes(index) ? (
            <Image
              key={service.slug}
              className={["service-carousel__photo", index === active && "service-carousel__photo_active"]
                .filter(Boolean)
                .join(" ")}
              src={service.photo.src}
              alt=""
              fill
              sizes="100vw"
              priority={index === initial}
              quality={PHOTO_QUALITY}
            />
          ) : null,
        )}
        <div className="service-carousel__veil" />
        <div className="service-carousel__fade" />
      </div>

      <div className="section__inner service-carousel__inner">
        {/* Re-mounted on every change (`key`), so the copy of the trip that
            arrives rises the same way it did the first time. */}
        <div
          key={current.slug}
          ref={copyRef}
          className={["service-carousel__copy", "reveal", copyInView && "reveal_state_in"].filter(Boolean).join(" ")}
          aria-live="polite"
        >
          {eyebrow && <span className="eyebrow service-carousel__eyebrow">{eyebrow}</span>}
          <h2 className="service-carousel__title">{tCatalog(`${current.slug}.headline`)}</h2>
          <p className="service-carousel__text">{tCatalog(`${current.slug}.pitch`)}</p>
          <dl className="service-carousel__facts">
            <div className="service-carousel__fact">
              <dt>{t("durationLabel")}</dt>
              <dd>{current.durationHours === null ? t("custom") : t("hours", { hours: current.durationHours })}</dd>
            </div>
            <div className="service-carousel__fact">
              <dt>{t("fromLabel")}</dt>
              <dd>{priceOf(current)}</dd>
            </div>
          </dl>
          <Link
            className="button button_shape_square service-carousel__book"
            href={{ pathname: "/servicios/[slug]", params: { slug: serviceSlug(current, locale) } }}
          >
            {tCommon("book")}
            <Icon name="bookmark" size={19} />
          </Link>
        </div>

        <div className="service-carousel__deck" ref={deckRef} data-entrance={entrance} {...swipeHandlers}>
          {LAPS.map((lap) =>
            services.map((service, index) => {
              const slot = deckSlot(index, cursor, count, lap);
              const signed = signedOffset(index, active, count);
              const distance = Math.min(Math.abs(signed), 2);
              const style = {
                "--slot": slot,
                "--d": signed,
                "--scale": PHONE_SCALE[distance],
                "--fade": Math.abs(signed) > 2 ? 0 : PHONE_FADE[distance],
                "--z": 10 - Math.abs(signed),
              } as CSSProperties;
              // The phone works on the first copy alone, so that is the one
              // that carries the marks of the active card.
              const isPhoneActive = index === active && lap === 0;

              return (
                <article
                  key={`${service.slug}-${lap}`}
                  className={["service-carousel__card", isPhoneActive && "service-carousel__card_active"]
                    .filter(Boolean)
                    .join(" ")}
                  style={style}
                  data-desk={isDeckSlotVisible(slot) ? "shown" : "hidden"}
                  data-lap={lap}
                >
                  <Image
                    className="service-carousel__card-photo"
                    src={service.photo.src}
                    alt={tCatalog(`${service.slug}.photoAlt`)}
                    fill
                    sizes="(max-width: 767px) 200px, 30vw"
                    quality={PHOTO_QUALITY}
                  />
                  <button
                    type="button"
                    className="service-carousel__pick"
                    aria-pressed={index === active}
                    onClick={() => select(index)}
                  >
                    <span className="service-carousel__card-name">{tCatalog(`${service.slug}.shortName`)}</span>
                    <span className="service-carousel__card-meta">{metaOf(service)}</span>
                  </button>
                  {isPhoneActive && (
                    <Link
                      className="button service-carousel__card-book"
                      href={{ pathname: "/servicios/[slug]", params: { slug: serviceSlug(service, locale) } }}
                      tabIndex={-1}
                    >
                      {tCommon("book")}
                      <Icon name="arrowRight" size={17} />
                    </Link>
                  )}
                </article>
              );
            }),
          )}
        </div>

        <div className="service-carousel__dots" role="group">
          {services.map((service, index) => (
            <button
              key={service.slug}
              type="button"
              className={["service-carousel__dot", index === active && "service-carousel__dot_active"]
                .filter(Boolean)
                .join(" ")}
              aria-label={tCatalog(`${service.slug}.shortName`)}
              aria-pressed={index === active}
              onClick={() => select(index)}
            >
              <span />
            </button>
          ))}
        </div>

        <Reveal className="service-carousel__actions" order={2}>
          <button type="button" className="service-carousel__arrow" onClick={prev} aria-label={t("prev")}>
            <Icon name="arrowLeft" size={18} />
          </button>
          <button
            type="button"
            className="service-carousel__arrow service-carousel__arrow_tone_white"
            onClick={next}
            aria-label={t("next")}
          >
            <Icon name="arrowRight" size={18} />
          </button>
          <Link className="button button_variant_glass button_shape_square service-carousel__all" href="/servicios">
            {tCommon("allServices")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
