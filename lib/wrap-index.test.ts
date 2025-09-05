import { describe, expect, it } from "vitest";
import { wrapIndex } from "./wrap-index";

describe("wrapIndex", () => {
  it("leaves an index inside the range untouched", () => {
    expect(wrapIndex(2, 5)).toBe(2);
  });

  it("wraps past both ends", () => {
    expect(wrapIndex(5, 5)).toBe(0);
    expect(wrapIndex(-1, 5)).toBe(4);
    expect(wrapIndex(-7, 5)).toBe(3);
  });

  it("throws for an empty list", () => {
    expect(() => wrapIndex(0, 0)).toThrow();
  });
});
