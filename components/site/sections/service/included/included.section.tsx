import { useTranslations } from "next-intl";
import { Icon } from "@/components/site/shared/icon.comp";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { WaveMark } from "@/components/site/shared/wave-mark.comp";
import type { Service } from "@/constants/services.const";
import { messageList } from "@/lib/message-list";
import "./included.section.css";

interface IncludedProps {
  service: Service;
}

// The sky-blue band: what the price covers, what it does not and what to
// bring, each on its own navy card. The phone makes the three a row it can
// scroll sideways, with the waves behind the title to save the height.
export function IncludedSection({ service }: IncludedProps) {
  const t = useTranslations("service");
  const tCatalog = useTranslations(`catalog.${service.slug}`);
  const includes = messageList(tCatalog.raw("includes"));
  const excludes = messageList(tCatalog.raw("excludes"));

  return (
    <section className="section included">
      <div className="section__inner">
        <div className="included__band">
          <Reveal className="included__head">
            <h2 className="section-title included__title">
              {t.rich("includedTitle", {
                accent: (chunks) => <span className="section-title__accent">{chunks}</span>,
              })}
            </h2>
            <WaveMark className="included__waves" />
          </Reveal>
          <div className="included__body">
            <Reveal className="included__card" order={1}>
              <h3 className="included__heading included__heading_tone_lime">{t("includes")}</h3>
              <ul className="included__list">
                {includes.map((item) => (
                  <li key={item} className="included__item">
                    <Icon className="included__check" name="check" size={22} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="included__card" order={2}>
              <h3 className="included__heading">{t("excludes")}</h3>
              <ul className="included__list">
                {excludes.map((item) => (
                  <li key={item} className="included__item included__item_kind_excluded">
                    <Icon name="cross" size={22} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="included__card" order={3}>
              <h3 className="included__heading">{t("bring")}</h3>
              <ul className="included__bring">
                {service.bring.map((item, index) => (
                  <li key={item} className="chip included__chip">
                    {/* The count is decoration: the list has no order to it. */}
                    <span className="included__number" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className="included__chip-label">{t(`bringItems.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
