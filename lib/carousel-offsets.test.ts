import { describe, expect, it } from "vitest";
import { aheadOffset, signedOffset } from "./carousel-offsets";

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
