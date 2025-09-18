import { describe, expect, it } from "vitest";
import { SERVICES } from "@/constants/services.const";
import { findServiceBySlug, serviceSlug, serviceSlugs } from "./service-slug";

const whales = SERVICES.find((service) => service.slug === "avistamiento-de-ballenas")!;
const yelapa = SERVICES.find((service) => service.slug === "yelapa-majahuitas")!;

describe("serviceSlug", () => {
  it("keeps the catalogue key in Spanish and translates it in English", () => {
    expect(serviceSlug(whales, "es")).toBe("avistamiento-de-ballenas");
    expect(serviceSlug(whales, "en")).toBe("whale-watching");
  });

  it("leaves the trips named after a place alone", () => {
    expect(serviceSlug(yelapa, "en")).toBe("yelapa-majahuitas");
  });
});

describe("serviceSlugs", () => {
  it("lists one segment per trip", () => {
    expect(serviceSlugs("en")).toHaveLength(SERVICES.length);
    expect(serviceSlugs("en")).toContain("private-charter");
    expect(new Set(serviceSlugs("en")).size).toBe(SERVICES.length);
  });
});

describe("findServiceBySlug", () => {
  it("reads the segment of the language being served", () => {
    expect(findServiceBySlug("whale-watching", "en")).toBe(whales);
    expect(findServiceBySlug("avistamiento-de-ballenas", "es")).toBe(whales);
  });

  it("does not answer to the segment of the other language", () => {
    expect(findServiceBySlug("avistamiento-de-ballenas", "en")).toBeUndefined();
    expect(findServiceBySlug("whale-watching", "es")).toBeUndefined();
  });

  it("does not answer to anything else", () => {
    expect(findServiceBySlug("kayak", "es")).toBeUndefined();
  });
});
