import { describe, expect, it } from "vitest";
import { bookingTotal } from "./booking-total";

describe("bookingTotal", () => {
  it("multiplies the price by the group and takes the deposit", () => {
    expect(bookingTotal(799, 2, 0.3)).toEqual({ total: 1598, deposit: 479 });
  });

  it("rounds the deposit to the peso", () => {
    expect(bookingTotal(916, 3, 0.3)).toEqual({ total: 2748, deposit: 824 });
  });

  it("rejects an empty or fractional group", () => {
    expect(() => bookingTotal(799, 0, 0.3)).toThrow();
    expect(() => bookingTotal(799, 1.5, 0.3)).toThrow();
  });
});
