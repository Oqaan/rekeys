import { describe, it, expect } from "vitest";
import { matchesHotkey } from "../src/matchesHotkey";
import { parseKey } from "../src/parseKey";

describe("matchesHotkey", () => {
  it("returns true when event matches combo", () => {
    const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
    expect(matchesHotkey(event, parseKey("cmd+k"))).toBe(true);
  });

  it("returns false when key is wrong", () => {
    const event = new KeyboardEvent("keydown", { key: "j" });
    expect(matchesHotkey(event, parseKey("k"))).toBe(false);
  });

  it("returns false when modifier is missing", () => {
    const event = new KeyboardEvent("keydown", { key: "k" });
    expect(matchesHotkey(event, parseKey("cmd+k"))).toBe(false);
  });

  it("returns false when extra modifier is pressed", () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      shiftKey: true,
    });
    expect(matchesHotkey(event, parseKey("cmd+k"))).toBe(false);
  });
});
