import { useTranslations } from "next-intl";
import { BRING_ICONS, Icon } from "@/components/site/shared/icon.comp";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { WaveMark } from "@/components/site/shared/wave-mark.comp";
import type { Service } from "@/constants/services.const";
import { messageList } from "@/lib/message-list";
import "./included.section.css";

interface IncludedProps {
  service: Service;
}

// The sky-blue band: what the price covers and what it does not, each on
// its own navy card, and what to bring as chips with an icon.
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
            <h2 className="section-title">
              {t.rich("includedTitle", {
                br: () => <br />,
                accent: (chunks) => <span className="section-title__accent">{chunks}</span>,
              })}
            </h2>
            <WaveMark />
          </Reveal>
          <div className="included__body">
            <div className="included__lists">
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
            </div>
            <Reveal order={3}>
              <h3 className="included__heading">{t("bring")}</h3>
              <ul className="included__bring">
                {service.bring.map((item) => (
                  <li key={item} className="chip included__chip">
                    <Icon className="chip__icon" name={BRING_ICONS[item]} size={18} />
                    {t(`bringItems.${item}`)}
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
