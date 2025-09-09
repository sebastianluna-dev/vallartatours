import { useTranslations } from "next-intl";
import type { ServiceSlug } from "@/constants/services.const";
import { formatIndex } from "@/lib/format-index";
import { messageRecords } from "@/lib/message-records";
import "./itinerary.section.css";

interface ItineraryProps {
  slug: ServiceSlug;
}

// The stops of the day on a lime timeline: number, clock time, title and
// what happens there.
export function ItinerarySection({ slug }: ItineraryProps) {
  const tCatalog = useTranslations(`catalog.${slug}`);
  const stops = messageRecords(tCatalog.raw("itinerary"), ["time", "title", "body"]);

  return (
    <section className="section itinerary">
      <div className="section__inner">
        <h2 className="section-title">{tCatalog("itineraryTitle")}</h2>
        <ol className="itinerary__list">
          {stops.map((stop, index) => (
            <li key={stop.title} className="itinerary__stop">
              <div className="itinerary__marker">
                <span className="itinerary__number">{formatIndex(index)}</span>
                <span className="itinerary__time">{stop.time}</span>
              </div>
              <h3 className="itinerary__title">{stop.title}</h3>
              <p className="itinerary__body">{stop.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
