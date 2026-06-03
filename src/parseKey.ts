import type { ParsedKey } from "./types";

const isMac =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/.test(navigator.platform);

export function parseKey(combo: string): ParsedKey {
  const parts = combo.toLowerCase().split("+");
  const parsed: ParsedKey = {
    key: "",
    meta: false,
    ctrl: false,
    shift: false,
    alt: false,
  };

  for (const part of parts) {
    switch (part) {
      case "cmd":
      case "meta":
        parsed.meta = true;
        break;
      case "ctrl":
      case "control":
        parsed.ctrl = true;
        break;
      case "shift":
        parsed.shift = true;
        break;
      case "alt":
      case "option":
        parsed.alt = true;
        break;
      case "mod":
        if (isMac) {
          parsed.meta = true;
        } else {
          parsed.ctrl = true;
        }
        break;
      default:
        parsed.key = part;
    }
  }
  return parsed;
}
