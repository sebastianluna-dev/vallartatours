import { useTranslations } from "next-intl";
import { Icon, type IconName } from "@/components/site/shared/icon.comp";
import { SITE } from "@/constants/site.const";
import { ContactForm } from "./contact-form.comp";
import "./contact.section.css";

// The message form on the left and the three ways to reach the crew on the
// right: address, email and phone.
export function ContactSection() {
  const t = useTranslations("contact.channels");

  const channels: { key: "address" | "email" | "phone"; icon: IconName; line1: string; href?: string }[] = [
    { key: "address", icon: "pin", line1: SITE.address },
    { key: "email", icon: "mail", line1: SITE.email, href: `mailto:${SITE.email}` },
    { key: "phone", icon: "phone", line1: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  ];

  return (
    <section className="section contact" id="formulario">
      <div className="section__inner contact__inner">
        <ContactForm />
        <ul className="contact__channels">
          {channels.map((channel) => (
            <li key={channel.key} className="contact__channel">
              <Icon name={channel.icon} size={46} />
              <h2 className="contact__channel-title">{t(`${channel.key}.title`)}</h2>
              <p className="contact__channel-text">
                {channel.href ? (
                  <a className="contact__channel-link" href={channel.href}>
                    {channel.line1}
                  </a>
                ) : (
                  channel.line1
                )}
                <br />
                {t(`${channel.key}.line2`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
