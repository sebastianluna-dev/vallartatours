"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** The element starts revealing when this much of it is on screen. */
const THRESHOLD = 0.15;
/** …and a little before its top edge reaches the fold. */
const ROOT_MARGIN = "0px 0px -8% 0px";

/**
 * Whether an element has already entered the viewport. It only says yes
 * once: what is revealed stays revealed, so scrolling back up does not make
 * the page blink. The stylesheet takes care of `prefers-reduced-motion`; if
 * the browser has no IntersectionObserver the class is written straight on
 * the node, so nothing can stay invisible.
 */
export function useReveal<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("reveal_state_in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, revealed];
}
