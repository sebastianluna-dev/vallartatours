import type { ComponentType } from "react";
import { HeroSection } from "@/components/site/sections/home/hero/hero.section";
import { ProofSection } from "@/components/site/sections/home/proof/proof.section";
import { ShowcaseSection } from "@/components/site/sections/home/showcase/showcase.section";
import { StepsSection } from "@/components/site/sections/home/steps/steps.section";

interface HomeSection {
  id: string;
  Section: ComponentType;
}

// The order of the home page.
export const HOME_SECTIONS: readonly HomeSection[] = [
  { id: "hero", Section: HeroSection },
  { id: "showcase", Section: ShowcaseSection },
  { id: "steps", Section: StepsSection },
  { id: "proof", Section: ProofSection },
];
