import { wrapIndex } from "./wrap-index";

// Which of the stage photographs are worth having in the DOM. The stage
// crossfades five full-width photos, so putting all five in the markup makes
// the home ask for five large images before anyone touches the carousel.
// Instead it starts with what is on screen and follows the visitor: once a
// photo has been loaded it stays, and going back is instant.

/** Before the first move: the photo on the stage and the one "next" reveals. */
export function initialPhotos(active: number, count: number): number[] {
  return sorted([wrapIndex(active, count), wrapIndex(active + 1, count)]);
}

/** After a move: what was already loaded, the new photo and both its neighbours. */
export function photosAfterMove(loaded: readonly number[], active: number, count: number): number[] {
  return sorted([...loaded, wrapIndex(active - 1, count), wrapIndex(active, count), wrapIndex(active + 1, count)]);
}

function sorted(indexes: readonly number[]): number[] {
  return [...new Set(indexes)].sort((a, b) => a - b);
}
