import type { routing } from "@/i18n/routing";
import type messages from "@/messages/es.json";

// Typed `t()` keys and `locale` values across the app. Spanish is the source
// catalogue; messages/en.json has to carry the same keys.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
