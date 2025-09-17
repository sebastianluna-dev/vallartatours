"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal.hook";
import "./reveal.comp.css";

/** Tags the wrapper can be, so it never changes the markup around it. */
type RevealTag = "div" | "article" | "li" | "blockquote";

interface RevealProps {
  children: ReactNode;
  /** The element to render; the same tag the layout expects in its place. */
  as?: RevealTag;
  className?: string;
  /** Place in a row: each card waits a little longer than the one before. */
  order?: number;
}

// Fades an element up the first time it reaches the viewport. It renders the
// element itself instead of wrapping it in a div, so neither the grid nor
// the direct-child selectors of the section notice it is here.
export function Reveal({ children, as: Tag = "div", className, order = 0 }: RevealProps) {
  const [ref, revealed] = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref as never}
      className={["reveal", revealed && "reveal_state_in", className].filter(Boolean).join(" ")}
      style={{ "--reveal-order": order } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
