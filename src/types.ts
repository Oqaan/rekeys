export interface ParsedKey {
  key: string;
  meta: boolean;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
}

export interface HotkeyOptions {
  preventDefault?: boolean;
  when?: boolean;
  target?: EventTarget;
}

export type HotkeyCallback = (event: KeyboardEvent) => void;

export type HotkeyEntry = [string, HotkeyCallback, HotkeyOptions?];
