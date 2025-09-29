"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/site/shared/reveal.comp";
import type { Service } from "@/constants/services.const";
import { addMinutes } from "@/lib/add-minutes";
import { formatTime } from "@/lib/format-time";
import { messageRecords } from "@/lib/message-records";
import { useDeparture } from "../departure.context";
import "./itinerary.section.css";

interface ItineraryProps {
  service: Service;
}

// The stops of the day: the hour on a lime pill, the title and what happens
// there. A trip with a fixed schedule writes its hours in the catalogue; the
// charter counts minutes from the departure of the booking card, so its
// stops follow whatever the visitor picks there.
export function ItinerarySection({ service }: ItineraryProps) {
  const tCatalog = useTranslations(`catalog.${service.slug}`);
  const stops = messageRecords(tCatalog.raw("itinerary"), ["time", "title", "body"]);
  const { time } = useDeparture();
  const offsets = service.itineraryOffsets;

  return (
    <section className="section itinerary">
      <div className="section__inner">
        <h2 className="section-title">{tCatalog("itineraryTitle")}</h2>
        <ol className="itinerary__list">
          {stops.map((stop, index) => (
            <Reveal as="li" key={stop.title} className="itinerary__stop">
              <div className="itinerary__marker">
                <span className="itinerary__time">
                  {offsets?.[index] === undefined ? stop.time : formatTime(addMinutes(time, offsets[index]))}
                </span>
              </div>
              <h3 className="itinerary__title">{stop.title}</h3>
              <p className="itinerary__body">{stop.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
