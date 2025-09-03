import { describe, expect, it } from "vitest";
import { formatIndex } from "./format-index";

describe("formatIndex", () => {
  it("pads the first nine positions with a zero", () => {
    expect(formatIndex(0)).toBe("01");
    expect(formatIndex(8)).toBe("09");
  });

  it("leaves two-digit positions as they are", () => {
    expect(formatIndex(9)).toBe("10");
    expect(formatIndex(41)).toBe("42");
  });
});
