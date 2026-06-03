import { describe, it, expect } from "vitest";
import { parseKey } from "../src/parseKey";

describe("parseKey", () => {
  it("parses a bare key", () => {
    expect(parseKey("k")).toEqual({
      key: "k",
      meta: false,
      ctrl: false,
      shift: false,
      alt: false,
    });
  });

  it("parses cmd+k", () => {
    expect(parseKey("cmd+k")).toEqual({
      key: "k",
      meta: true,
      ctrl: false,
      shift: false,
      alt: false,
    });
  });

  it("parses meta+k", () => {
    expect(parseKey("meta+k")).toEqual({
      key: "k",
      meta: true,
      ctrl: false,
      shift: false,
      alt: false,
    });
  });

  it("parses ctrl+shift+a", () => {
    expect(parseKey("ctrl+shift+a")).toEqual({
      key: "a",
      meta: false,
      ctrl: true,
      shift: true,
      alt: false,
    });
  });

  it("parses alt+enter", () => {
    expect(parseKey("alt+enter")).toEqual({
      key: "enter",
      meta: false,
      ctrl: false,
      shift: false,
      alt: true,
    });
  });

  it("parses escape", () => {
    expect(parseKey("escape")).toEqual({
      key: "escape",
      meta: false,
      ctrl: false,
      shift: false,
      alt: false,
    });
  });

  it("parses option+f", () => {
    expect(parseKey("option+f")).toEqual({
      key: "f",
      meta: false,
      ctrl: false,
      shift: false,
      alt: true,
    });
  });
});
