import { describe, expect, it } from "vitest";
import { formatNumber, formatPrice } from "./format-price";

describe("formatPrice", () => {
  it("prints pesos without decimals in both languages", () => {
    expect(formatPrice(916, "es")).toBe("$916");
    expect(formatPrice(916, "en")).toBe("$916");
  });

  it("groups thousands with a comma", () => {
    expect(formatPrice(1598, "es")).toBe("$1,598");
    expect(formatPrice(1598, "en")).toBe("$1,598");
  });

  it("rounds to the peso", () => {
    expect(formatPrice(479.4, "es")).toBe("$479");
  });
});

describe("formatNumber", () => {
  it("groups thousands", () => {
    expect(formatNumber(9754, "es")).toBe("9,754");
    expect(formatNumber(9754, "en")).toBe("9,754");
  });
});
