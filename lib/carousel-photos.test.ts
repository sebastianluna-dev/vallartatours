import { describe, expect, it } from "vitest";
import { initialPhotos, photosAfterMove } from "./carousel-photos";

describe("initialPhotos", () => {
  it("takes the photo on the stage and the next one", () => {
    expect(initialPhotos(0, 5)).toEqual([0, 1]);
    expect(initialPhotos(3, 5)).toEqual([3, 4]);
  });

  it("goes round at the end of the list", () => {
    expect(initialPhotos(4, 5)).toEqual([0, 4]);
  });
});

describe("photosAfterMove", () => {
  it("adds the photo that arrived and both its neighbours", () => {
    expect(photosAfterMove([0, 1], 1, 5)).toEqual([0, 1, 2]);
    expect(photosAfterMove([0, 1, 2], 2, 5)).toEqual([0, 1, 2, 3]);
  });

  it("keeps every photo that was already loaded", () => {
    expect(photosAfterMove([0, 1, 2, 3], 4, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("wraps the neighbours of the first and the last", () => {
    expect(photosAfterMove([], 0, 5)).toEqual([0, 1, 4]);
  });
});
