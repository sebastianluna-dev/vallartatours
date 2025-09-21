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

/**
 * How many copies of each trip the desktop stack renders. The stack only ever
 * slides left: a trip walks off the left edge and comes back on the right as
 * a *different* node, so no card is ever seen travelling backwards. Three
 * laps is what it takes for the longest move the deck allows (a click on the
 * third card) to be a clean slide in both directions.
 */
export const DECK_LAPS = 3;

/** Slots the desktop stack shows: the three cards to the right of the copy. */
export const DECK_VISIBLE = 3;

/**
 * Where the copy `lap` of a trip sits in the desktop stack, counted from the
 * first card on screen. Slot -1 is the trip playing on the stage (its photo
 * is the background, so the card is hidden), 0 to 2 are the cards on screen
 * and anything else is off stage, waiting on the right or walking off on the
 * left. `cursor` is the carousel's position, which only ever grows or
 * shrinks — it never wraps, which is what keeps the movement one-way.
 */
export function deckSlot(index: number, cursor: number, count: number, lap: number): number {
  // Room on the left for the longest walk off stage, so a card that leaves
  // keeps going instead of being re-based (and seen) mid-move.
  const room = count - 1;
  return wrapIndex(index - cursor + lap * count + room, count * DECK_LAPS) - room - 1;
}

/** Whether a slot is one of the cards the desktop stack shows. */
export function isDeckSlotVisible(slot: number): boolean {
  return slot >= 0 && slot < DECK_VISIBLE;
}
