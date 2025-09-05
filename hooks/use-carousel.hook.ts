"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { wrapIndex } from "@/lib/wrap-index";

const SWIPE_MIN_PX = 40;

export interface SwipeHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: () => void;
}

// The active index of a circular carousel, with the previous/next moves and
// a horizontal swipe. The swipe is measured between pointer down and up so
// a tap on a card still reaches the card's own button.
export function useCarousel(count: number, initial = 0) {
  const [active, setActive] = useState(() => wrapIndex(initial, count));
  const startX = useRef<number | null>(null);

  const select = useCallback((index: number) => setActive(wrapIndex(index, count)), [count]);
  const next = useCallback(() => setActive((current) => wrapIndex(current + 1, count)), [count]);
  const prev = useCallback(() => setActive((current) => wrapIndex(current - 1, count)), [count]);

  const swipeHandlers: SwipeHandlers = {
    onPointerDown: (event) => {
      startX.current = event.clientX;
    },
    onPointerUp: (event) => {
      if (startX.current === null) return;
      const delta = event.clientX - startX.current;
      startX.current = null;
      if (delta <= -SWIPE_MIN_PX) next();
      else if (delta >= SWIPE_MIN_PX) prev();
    },
    onPointerCancel: () => {
      startX.current = null;
    },
  };

  return { active, select, next, prev, swipeHandlers };
}
