import { describe, expect, it } from "vitest";
import { addMinutes } from "./add-minutes";

describe("addMinutes", () => {
  it("moves the clock forward", () => {
    expect(addMinutes("08:00", 90)).toBe("09:30");
    expect(addMinutes("08:00", 0)).toBe("08:00");
    expect(addMinutes("12:00", 420)).toBe("19:00");
  });

  it("wraps past midnight", () => {
    expect(addMinutes("16:00", 420)).toBe("23:00");
    expect(addMinutes("22:30", 120)).toBe("00:30");
  });

  it("goes back too", () => {
    expect(addMinutes("00:30", -60)).toBe("23:30");
  });

  it("rejects anything that is not a time", () => {
    expect(() => addMinutes("8 am", 30)).toThrow();
    expect(() => addMinutes("08:00", 1.5)).toThrow();
  });
});
