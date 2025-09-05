import { wrapIndex } from "./wrap-index";

// Where a card sits relative to the active one. The desktop stack shows the
// cards that come *after* the active service (offset 1 is the first card,
// the active one is on the background); the phone stack fans the cards out to
// both sides, so it needs the signed, shortest distance.

/** 0 for the active card, 1 for the next one… up to count - 1. */
export function aheadOffset(index: number, active: number, count: number): number {
  return wrapIndex(index - active, count);
}

/** Shortest signed distance: negative for cards before the active one. */
export function signedOffset(index: number, active: number, count: number): number {
  const ahead = aheadOffset(index, active, count);
  return ahead > count / 2 ? ahead - count : ahead;
}
