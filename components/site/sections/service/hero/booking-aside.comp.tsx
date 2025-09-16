"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Service } from "@/constants/services.const";
import { DEPOSIT_RATE, SITE } from "@/constants/site.const";
import { bookingTotal } from "@/lib/booking-total";
import { buildWhatsappUrl } from "@/lib/build-whatsapp-url";
import { formatMonth } from "@/lib/format-month";
import { formatPrice } from "@/lib/format-price";
import { formatTime } from "@/lib/format-time";
import { localeTag } from "@/lib/locale-tag";
import { isDateInSeason } from "@/lib/season";
import "./booking-aside.comp.css";

interface BookingAsideProps {
  service: Service;
  /** Prefill, as the home's search sends it in `?fecha=&personas=`. */
  initialDate?: string | null;
  initialPeople?: string | null;
}

const MAX_PEOPLE_DEFAULT = 16;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function readPeople(value: string | null, max: number): number {
  const people = Number(value);
  return Number.isInteger(people) && people >= 1 ? Math.min(people, max) : 2;
}

// The white card: departure time, date, people, the sum and the deposit,
// and the WhatsApp message with all of it typed out. There is no payment
// yet: the message is the booking request. The charter has no price, so it
// asks for a quote instead of a total.
export function BookingAside({ service, initialDate = null, initialPeople = null }: BookingAsideProps) {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");
  const tCatalog = useTranslations(`catalog.${service.slug}`);
  const locale = useLocale();
  const maxPeople = service.groupSize ?? MAX_PEOPLE_DEFAULT;

  const [time, setTime] = useState(service.departures[0]);
  const [date, setDate] = useState(initialDate && ISO_DATE.test(initialDate) ? initialDate : "");
  const [people, setPeople] = useState(readPeople(initialPeople, maxPeople));
  // Today's date depends on the visitor's clock, so the lower bound of the
  // date field is written on the DOM node after hydration.
  const dateRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = new Date().toISOString().slice(0, 10);
  }, []);

  const priceOf = (amount: number) => formatPrice(amount, locale);
  const totals = service.price === null ? null : bookingTotal(service.price, people, DEPOSIT_RATE);
  const dateLabel = date
    ? new Intl.DateTimeFormat(localeTag(locale), { day: "numeric", month: "long", timeZone: "UTC" }).format(
        new Date(date),
      )
    : null;
  // A seasonal trip (the whales, December to March) says so under the date,
  // and warns when the date that was picked falls outside it.
  const season = service.season;
  const seasonMonths = season ? { from: formatMonth(season.from, locale), to: formatMonth(season.to, locale) } : null;
  const outOfSeason = !isDateInSeason(season, date);
  const messageKey = service.price === null ? "quoteMessage" : "message";
  const message = t(dateLabel ? messageKey : `${messageKey}NoDate`, {
    service: tCatalog("name"),
    date: dateLabel ?? "",
    time: formatTime(time),
    people: t("adults", { count: people }),
  });

  return (
    <aside className="booking-aside" id="reservar" aria-label={t("label")}>
      <fieldset className="booking-aside__group">
        <legend className="booking-aside__label">{t("yourTrip")}</legend>
        <div className="booking-aside__times" role="radiogroup" aria-label={t("departure")}>
          {service.departures.map((departure) => (
            <button
              key={departure}
              type="button"
              role="radio"
              aria-checked={departure === time}
              className={["booking-aside__time", departure === time && "booking-aside__time_active"]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setTime(departure)}
            >
              {formatTime(departure)}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="booking-aside__fields">
        <label className="booking-aside__field">
          <span className="booking-aside__field-label">{t("date")}</span>
          <input
            className="booking-aside__input"
            ref={dateRef}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <label className="booking-aside__field">
          <span className="booking-aside__field-label">{t("people")}</span>
          <select
            className="booking-aside__input"
            value={people}
            onChange={(event) => setPeople(Number(event.target.value))}
          >
            {Array.from({ length: maxPeople }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {t("adults", { count })}
              </option>
            ))}
          </select>
        </label>
      </div>

      {seasonMonths ? (
        <p
          className={["booking-aside__season", outOfSeason && "booking-aside__season_state_out"]
            .filter(Boolean)
            .join(" ")}
          role={outOfSeason ? "status" : undefined}
        >
          {t(outOfSeason ? "seasonNotice" : "season", seasonMonths)}
        </p>
      ) : null}

      {totals && service.price !== null ? (
        <dl className="booking-aside__summary">
          <div className="booking-aside__line">
            <dt>{t("lineAdults", { count: t("adults", { count: people }), price: priceOf(service.price) })}</dt>
            <dd>{priceOf(totals.total)}</dd>
          </div>
          <div className="booking-aside__line">
            <dt>{t("dock")}</dt>
            <dd>{t("included")}</dd>
          </div>
          <div className="booking-aside__line booking-aside__line_kind_total">
            <dt>{t("total")}</dt>
            <dd>{priceOf(totals.total)}</dd>
          </div>
          <div className="booking-aside__note">{t("deposit", { amount: priceOf(totals.deposit) })}</div>
        </dl>
      ) : (
        <p className="booking-aside__summary booking-aside__note">{t("quoteNote")}</p>
      )}

      <a
        className="button button_variant_navy button_width_full booking-aside__submit"
        href={buildWhatsappUrl(SITE.whatsapp, message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {totals ? t("submit", { count: people }) : t("submitQuote")}
      </a>
      <a
        className="button button_width_full"
        href={buildWhatsappUrl(SITE.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {tCommon("askWhatsapp")}
      </a>
      <span className="booking-aside__fine">{date ? t("cancel") : t("pickDate")}</span>
    </aside>
  );
}

// Reads the home search's choice from the query string. It bails out of the
// static render, so the hero puts it inside a Suspense boundary whose
// fallback is the same card without a prefill.
export function BookingAsideFromQuery({ service }: { service: Service }) {
  const searchParams = useSearchParams();
  return (
    <BookingAside
      service={service}
      initialDate={searchParams.get("fecha")}
      initialPeople={searchParams.get("personas")}
    />
  );
}
