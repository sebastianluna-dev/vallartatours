"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { aheadOffset } from "@/lib/carousel-offsets";
import { initialPhotos, photosAfterMove } from "@/lib/carousel-photos";
import { wrapIndex } from "@/lib/wrap-index";

const SWIPE_MIN_PX = 40;

export interface SwipeHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: () => void;
}

// The position of a circular carousel, with the previous/next moves and a
// horizontal swipe. The swipe is measured between pointer down and up so a
// tap on a card still reaches the card's own button.
//
// `cursor` counts the moves and never wraps: the desktop stack needs it to
// know which way each card travels (lib/carousel-offsets.ts), so `active` is
// only the trip it lands on. `loaded` grows with the visit: it is the list of
// slides whose photo is worth having in the DOM (lib/carousel-photos.ts), and
// both live in one state so a move updates them in the same pass.
export function useCarousel(count: number, initial = 0) {
  const [{ cursor, loaded }, setState] = useState(() => ({
    cursor: wrapIndex(initial, count),
    loaded: initialPhotos(initial, count),
  }));
  const startX = useRef<number | null>(null);
  const active = wrapIndex(cursor, count);

  const move = useCallback(
    (to: (current: number) => number) =>
      setState((current) => {
        const target = to(current.cursor);
        if (target === current.cursor) return current;
        return { cursor: target, loaded: photosAfterMove(current.loaded, wrapIndex(target, count), count) };
      }),
    [count],
  );

  // Picking a card walks forward as many places as the card is away, so the
  // stack keeps moving in one direction however far the visitor jumps.
  const select = useCallback(
    (index: number) => move((current) => current + aheadOffset(index, wrapIndex(current, count), count)),
    [count, move],
  );
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

  return { active, cursor, loaded, select, next, prev, swipeHandlers };
}
