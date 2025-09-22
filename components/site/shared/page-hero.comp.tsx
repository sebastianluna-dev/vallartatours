import Image from "next/image";
import type { ReactNode } from "react";
import "./page-hero.comp.css";
import { PHOTO_QUALITY } from "@/constants/site.const";

interface PageHeroProps {
  photo: string;
  photoAlt: string;
  title: string;
  lead: string;
  /** "tall" for the services page, "short" for the contact page. */
  size?: "tall" | "short";
  children?: ReactNode;
}

// Photo, veil and a centred title under the header: the top of the services
// and contact pages.
export function PageHero({ photo, photoAlt, title, lead, size = "tall", children }: PageHeroProps) {
  return (
    <section className={`section page-hero page-hero_size_${size}`}>
      <Image
        className="page-hero__photo"
        src={photo}
        alt={photoAlt}
        fill
        priority
        sizes="100vw"
        quality={PHOTO_QUALITY}
      />
      <div className="page-hero__veil" />
      <div className="section__inner page-hero__inner">
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__lead">{lead}</p>
        {children}
      </div>
    </section>
  );
}
