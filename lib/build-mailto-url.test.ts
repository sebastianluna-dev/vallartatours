import { describe, expect, it } from "vitest";
import { buildMailtoUrl } from "./build-mailto-url";

describe("buildMailtoUrl", () => {
  it("returns a bare mailto without subject or body", () => {
    expect(buildMailtoUrl("hola@ejemplo.com")).toBe("mailto:hola@ejemplo.com");
  });

  it("encodes the subject", () => {
    expect(buildMailtoUrl("hola@ejemplo.com", "Charter en marzo")).toBe(
      "mailto:hola@ejemplo.com?subject=Charter%20en%20marzo",
    );
  });

  it("adds the body after the subject, line breaks included", () => {
    expect(buildMailtoUrl("hola@ejemplo.com", "Hola", "Línea 1\nLínea 2")).toBe(
      "mailto:hola@ejemplo.com?subject=Hola&body=L%C3%ADnea%201%0AL%C3%ADnea%202",
    );
  });
});
