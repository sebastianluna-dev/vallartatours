import { describe, expect, it } from "vitest";
import { formatMonth } from "./format-month";

describe("formatMonth", () => {
  it("names the month in each language", () => {
    expect(formatMonth(12, "es")).toBe("diciembre");
    expect(formatMonth(3, "es")).toBe("marzo");
    expect(formatMonth(12, "en")).toBe("December");
  });

  it("rejects anything that is not a month", () => {
    expect(() => formatMonth(0, "es")).toThrow();
    expect(() => formatMonth(13, "es")).toThrow();
  });
});
