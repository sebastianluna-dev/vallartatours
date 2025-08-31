// The catalogues keep a few lists as JSON arrays (what a trip includes and
// what it does not). next-intl hands them back untyped through `t.raw`; this narrows them
// to strings so a typo in the JSON fails loudly instead of rendering "[object]".
export function messageList(value: unknown): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error("Expected a list of strings in the messages");
  }
  return value;
}
