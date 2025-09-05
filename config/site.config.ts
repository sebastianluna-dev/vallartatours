import type { ComponentType } from "react";
import { HeroSection } from "@/components/site/sections/home/hero/hero.section";
import { ShowcaseSection } from "@/components/site/sections/home/showcase/showcase.section";

interface HomeSection {
  id: string;
  Section: ComponentType;
}

// The order of the home page.
export const HOME_SECTIONS: readonly HomeSection[] = [
  { id: "hero", Section: HeroSection },
  { id: "showcase", Section: ShowcaseSection },
];
