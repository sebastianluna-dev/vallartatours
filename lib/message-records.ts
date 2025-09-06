// Lists of records in the catalogues (itinerary stops, questions, reviews):
// next-intl hands them back untyped through `t.raw`, so this checks that
// every item carries the expected string fields before a component reads
// them. A typo in the JSON then fails loudly instead of rendering "undefined".
export function messageRecords<K extends string>(value: unknown, fields: readonly K[]): Record<K, string>[] {
  if (!Array.isArray(value)) {
    throw new Error("Expected a list of records in the messages");
  }
  for (const item of value) {
    if (typeof item !== "object" || item === null) {
      throw new Error("Expected every item of the list to be a record");
    }
    for (const field of fields) {
      if (typeof (item as Record<string, unknown>)[field] !== "string") {
        throw new Error(`Expected every record of the list to carry "${field}"`);
      }
    }
  }
  return value as Record<K, string>[];
}
