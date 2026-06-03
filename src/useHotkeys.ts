import { useEffect, useRef } from "react";
import { parseKey } from "./parseKey";
import { matchesHotkey } from "./matchesHotkey";
import type { HotkeyCallback, HotkeyEntry, HotkeyOptions } from "./types";

export function useHotkeys(
  combo: string,
  callback: HotkeyCallback,
  options?: HotkeyOptions,
): void;
export function useHotkeys(entries: HotkeyEntry[]): void;

export function useHotkeys(
  input: string | HotkeyEntry[],
  callback?: HotkeyCallback,
  options?: HotkeyOptions,
): void {
  const latestRef = useRef({ input, callback, options });
  latestRef.current = { input, callback, options };

  const target =
    typeof window !== "undefined"
      ? typeof input === "string"
        ? (options?.target ?? window)
        : window
      : null;

  useEffect(() => {
    if (!target) return;

    const handler = (event: KeyboardEvent) => {
      const { input: inp, callback: cb, options: opts } = latestRef.current;

      const entries: Array<[string, HotkeyCallback, HotkeyOptions]> =
        typeof inp === "string"
          ? [[inp, cb!, opts ?? {}]]
          : inp.map(([combo, fn, entryOpts = {}]) => [combo, fn, entryOpts]);

      for (const [combo, fn, entryOpts] of entries) {
        if (entryOpts.when === false) continue;
        if (matchesHotkey(event, parseKey(combo))) {
          if (entryOpts.preventDefault) event.preventDefault();
          fn(event);
        }
      }
    };

    target.addEventListener("keydown", handler as EventListener);
    return () =>
      target.removeEventListener("keydown", handler as EventListener);
  }, [target]);
}
