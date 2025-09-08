import { describe, expect, it } from "vitest";
import { formatTime } from "./format-time";

describe("formatTime", () => {
  it("converts 24 h times to the 12 h form the crew uses", () => {
    expect(formatTime("08:00")).toBe("8:00 am");
    expect(formatTime("15:00")).toBe("3:00 pm");
    expect(formatTime("12:00")).toBe("12:00 pm");
    expect(formatTime("00:30")).toBe("12:30 am");
  });

  it("rejects anything else", () => {
    expect(() => formatTime("8 am")).toThrow();
  });
});
