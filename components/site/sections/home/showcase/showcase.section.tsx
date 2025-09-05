import { ServiceCarousel } from "@/components/site/shared/service-carousel.comp";
import { SERVICES } from "@/constants/services.const";

// The service picker with the five trips, straight under the hero.
export function ShowcaseSection() {
  return <ServiceCarousel services={SERVICES} />;
}
