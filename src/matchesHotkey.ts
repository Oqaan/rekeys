import type { ParsedKey } from "./types";

export function matchesHotkey(
  event: KeyboardEvent,
  parsed: ParsedKey,
): boolean {
  return (
    event.key.toLowerCase() === parsed.key.toLowerCase() &&
    event.metaKey === parsed.meta &&
    event.ctrlKey === parsed.ctrl &&
    event.shiftKey === parsed.shift &&
    event.altKey === parsed.alt
  );
}
