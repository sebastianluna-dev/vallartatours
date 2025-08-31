import { describe, expect, it } from "vitest";
import { messageList } from "./message-list";

describe("messageList", () => {
  it("returns a list of strings untouched", () => {
    expect(messageList(["a", "b"])).toEqual(["a", "b"]);
  });

  it("throws for anything that is not a list of strings", () => {
    expect(() => messageList("a")).toThrow();
    expect(() => messageList(["a", 1])).toThrow();
  });
});
