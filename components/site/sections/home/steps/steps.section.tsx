import { useTranslations } from "next-intl";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { WaveMark } from "@/components/site/shared/wave-mark.comp";
import { SITE } from "@/constants/site.const";
import { buildWhatsappUrl } from "@/lib/build-whatsapp-url";
import { formatIndex } from "@/lib/format-index";
import { messageRecords } from "@/lib/message-records";
import "./steps.section.css";

// The sky-blue band: how a booking goes, in three numbered cards, and the
// WhatsApp button with the opening hours.
export function StepsSection() {
  const t = useTranslations("home.steps");
  const tCommon = useTranslations("common");
  const steps = messageRecords(t.raw("items"), ["title", "body"]);

  return (
    <section className="section steps">
      <div className="section__inner">
        <div className="steps__band">
          <div className="steps__head">
            <h2 className="section-title">
              {t.rich("title", { accent: (chunks) => <span className="section-title__accent">{chunks}</span> })}
            </h2>
            <WaveMark />
          </div>
          <ol className="steps__list">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.title} className="steps__item" order={index}>
                <span className="steps__number" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="steps__index">{formatIndex(index)}</span>
                <h3 className="steps__item-title">{step.title}</h3>
                <p className="steps__item-body">{step.body}</p>
              </Reveal>
            ))}
          </ol>
          <div className="steps__foot">
            <a
              className="button button_variant_white"
              href={buildWhatsappUrl(SITE.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tCommon("whatsapp")}
            </a>
            <span className="steps__hours">{tCommon("hours")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
