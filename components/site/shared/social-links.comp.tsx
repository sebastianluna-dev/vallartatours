import { useTranslations } from "next-intl";
import { SITE } from "@/constants/site.const";
import { Icon, type IconName } from "./icon.comp";
import "./social-links.comp.css";

const NETWORKS: { key: "facebook" | "instagram" | "tripadvisor"; icon: IconName; href: string }[] = [
  { key: "facebook", icon: "facebook", href: SITE.facebook },
  { key: "instagram", icon: "instagram", href: SITE.instagram },
  { key: "tripadvisor", icon: "tripadvisor", href: SITE.tripadvisor },
];

// Round white buttons with the three networks; the phone footer shows the
// same list in glass.
export function SocialLinks() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <ul className="social-links">
      {NETWORKS.map(({ key, icon, href }) => (
        <li key={key}>
          <a
            className="social-links__link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t(key)} ${tCommon("opensInNewTab")}`}
          >
            <Icon name={icon} size={icon === "tripadvisor" ? 27 : 25} />
          </a>
        </li>
      ))}
    </ul>
  );
}
