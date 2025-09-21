import { describe, expect, it } from "vitest";
import { aheadOffset, DECK_LAPS, DECK_VISIBLE, deckSlot, isDeckSlotVisible, signedOffset } from "./carousel-offsets";

describe("aheadOffset", () => {
  it("counts forward from the active card and wraps", () => {
    expect(aheadOffset(2, 2, 5)).toBe(0);
    expect(aheadOffset(3, 2, 5)).toBe(1);
    expect(aheadOffset(0, 2, 5)).toBe(3);
    expect(aheadOffset(1, 2, 5)).toBe(4);
  });
});

describe("signedOffset", () => {
  it("returns the shortest way round", () => {
    expect(signedOffset(2, 2, 5)).toBe(0);
    expect(signedOffset(3, 2, 5)).toBe(1);
    expect(signedOffset(4, 2, 5)).toBe(2);
    expect(signedOffset(0, 2, 5)).toBe(-2);
    expect(signedOffset(1, 2, 5)).toBe(-1);
  });

  it("puts the opposite card of an even list ahead", () => {
    expect(signedOffset(2, 0, 4)).toBe(2);
  });
});

describe("deckSlot", () => {
  const COUNT = 5;
  const LAPS = [...Array(DECK_LAPS).keys()];
  const CURSORS = [...Array(12).keys()].map((value) => value - 3);

  /** Which trip each card on screen shows, left to right. */
  function onScreen(cursor: number, count = COUNT): number[] {
    const cards: number[] = [];
    for (let index = 0; index < count; index++) {
      for (const lap of LAPS) {
        const slot = deckSlot(index, cursor, count, lap);
        if (isDeckSlotVisible(slot)) cards[slot] = index;
      }
    }
    return cards;
  }

  it("shows the three trips that come after the active one, in order", () => {
    expect(onScreen(2)).toEqual([3, 4, 0]);
    expect(onScreen(4)).toEqual([0, 1, 2]);
  });

  it("keeps the active trip one step off stage, on the left", () => {
    expect(LAPS.map((lap) => deckSlot(2, 2, COUNT, lap))).toContain(-1);
  });

  it("shows exactly one copy of each trip, and three cards in all", () => {
    for (const cursor of CURSORS) {
      for (let index = 0; index < COUNT; index++) {
        const visible = LAPS.filter((lap) => isDeckSlotVisible(deckSlot(index, cursor, COUNT, lap)));
        expect(visible.length).toBeLessThanOrEqual(1);
      }
      expect(onScreen(cursor).filter((trip) => trip !== undefined)).toHaveLength(DECK_VISIBLE);
    }
  });

  it("slides every card that is on screen to the left, never to the right", () => {
    for (const cursor of CURSORS) {
      for (let step = 1; step <= DECK_VISIBLE; step++) {
        for (let index = 0; index < COUNT; index++) {
          for (const lap of LAPS) {
            const before = deckSlot(index, cursor, COUNT, lap);
            if (before < -1 || before > DECK_VISIBLE) continue;
            expect(deckSlot(index, cursor + step, COUNT, lap)).toBe(before - step);
          }
        }
      }
    }
  });

  it("slides them to the right when the carousel goes back", () => {
    for (const cursor of CURSORS) {
      for (let step = 1; step <= DECK_VISIBLE; step++) {
        for (let index = 0; index < COUNT; index++) {
          for (const lap of LAPS) {
            const before = deckSlot(index, cursor, COUNT, lap);
            if (before < -1 || before > DECK_VISIBLE) continue;
            expect(deckSlot(index, cursor - step, COUNT, lap)).toBe(before + step);
          }
        }
      }
    }
  });

  it("works the same for the four trips of a detail page", () => {
    for (const cursor of CURSORS) {
      expect(onScreen(cursor, 4).filter((trip) => trip !== undefined)).toHaveLength(DECK_VISIBLE);
    }
  });
});
