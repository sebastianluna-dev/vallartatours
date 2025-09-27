"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Whether at least `threshold` of an element (0-1) is on screen, kept up to
 * date as the visitor scrolls. `useReveal` answers the same question once and
 * stops; this one keeps answering, which is what something that listens to
 * the keyboard while it is on screen needs.
 */
export function useInView<T extends HTMLElement>(threshold: number): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
