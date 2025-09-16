"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { initialPhotos, photosAfterMove } from "@/lib/carousel-photos";
import { wrapIndex } from "@/lib/wrap-index";

const SWIPE_MIN_PX = 40;

export interface SwipeHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: () => void;
}

// The active index of a circular carousel, with the previous/next moves and
// a horizontal swipe. The swipe is measured between pointer down and up so
// a tap on a card still reaches the card's own button. `loaded` grows with
// the visit: it is the list of slides whose photo is worth having in the
// DOM (see lib/carousel-photos.ts), and the two live in one state so a move
// updates both in the same pass.
export function useCarousel(count: number, initial = 0) {
  const [{ active, loaded }, setState] = useState(() => ({
    active: wrapIndex(initial, count),
    loaded: initialPhotos(initial, count),
  }));
  const startX = useRef<number | null>(null);

  const move = useCallback(
    (to: (current: number) => number) =>
      setState((current) => {
        const target = wrapIndex(to(current.active), count);
        if (target === current.active) return current;
        return { active: target, loaded: photosAfterMove(current.loaded, target, count) };
      }),
    [count],
  );

  const select = useCallback((index: number) => move(() => index), [move]);
  const next = useCallback(() => move((current) => current + 1), [move]);
  const prev = useCallback(() => move((current) => current - 1), [move]);

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

  return { active, loaded, select, next, prev, swipeHandlers };
}
