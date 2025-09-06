import { describe, expect, it } from "vitest";
import { messageRecords } from "./message-records";

describe("messageRecords", () => {
  it("returns the list when every record carries the fields", () => {
    const list = [{ title: "a", body: "b" }];
    expect(messageRecords(list, ["title", "body"])).toBe(list);
  });

  it("throws when the value is not a list", () => {
    expect(() => messageRecords({ title: "a" }, ["title"])).toThrow();
  });

  it("throws when a record misses a field or it is not a string", () => {
    expect(() => messageRecords([{ title: "a" }], ["title", "body"])).toThrow('"body"');
    expect(() => messageRecords([{ title: 1 }], ["title"])).toThrow();
    expect(() => messageRecords(["a"], ["title"])).toThrow();
  });
});
