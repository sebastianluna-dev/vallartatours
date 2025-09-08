import { describe, expect, it } from "vitest";
import { buildWhatsappUrl } from "./build-whatsapp-url";

describe("buildWhatsappUrl", () => {
  it("returns a bare chat link without text", () => {
    expect(buildWhatsappUrl("523220000000")).toBe("https://wa.me/523220000000");
  });

  it("keeps only the digits of the number", () => {
    expect(buildWhatsappUrl("+52 322 000 0000")).toBe("https://wa.me/523220000000");
  });

  it("encodes the message", () => {
    expect(buildWhatsappUrl("523220000000", "Hola, ¿hay lugar?")).toBe(
      "https://wa.me/523220000000?text=Hola%2C%20%C2%BFhay%20lugar%3F",
    );
  });

  it("throws for a number without digits", () => {
    expect(() => buildWhatsappUrl("")).toThrow();
  });
});
