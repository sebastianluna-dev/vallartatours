// Keeps an index inside [0, count) so the carousel goes round in a circle:
// wrapIndex(-1, 5) is 4 and wrapIndex(5, 5) is 0.
export function wrapIndex(index: number, count: number): number {
  if (count <= 0) throw new Error("Expected a count above zero");
  return ((index % count) + count) % count;
}
