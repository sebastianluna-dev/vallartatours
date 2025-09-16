import { describe, expect, it } from "vitest";
import { isDateInSeason, isMonthInSeason } from "./season";

const WHALES = { from: 12, to: 3 };
const SUMMER = { from: 6, to: 8 };

describe("isMonthInSeason", () => {
  it("covers a range inside one year", () => {
    expect(isMonthInSeason(SUMMER, 6)).toBe(true);
    expect(isMonthInSeason(SUMMER, 8)).toBe(true);
    expect(isMonthInSeason(SUMMER, 5)).toBe(false);
    expect(isMonthInSeason(SUMMER, 9)).toBe(false);
  });

  it("wraps around the end of the year", () => {
    expect(isMonthInSeason(WHALES, 12)).toBe(true);
    expect(isMonthInSeason(WHALES, 1)).toBe(true);
    expect(isMonthInSeason(WHALES, 3)).toBe(true);
    expect(isMonthInSeason(WHALES, 4)).toBe(false);
    expect(isMonthInSeason(WHALES, 11)).toBe(false);
  });
});

describe("isDateInSeason", () => {
  it("reads the month of the date the card holds", () => {
    expect(isDateInSeason(WHALES, "2026-01-18")).toBe(true);
    expect(isDateInSeason(WHALES, "2026-07-18")).toBe(false);
  });

  it("does not complain about a trip that runs all year", () => {
    expect(isDateInSeason(null, "2026-07-18")).toBe(true);
  });

  it("does not complain while there is no date yet", () => {
    expect(isDateInSeason(WHALES, "")).toBe(true);
    expect(isDateInSeason(WHALES, "18/07/2026")).toBe(true);
  });
});
