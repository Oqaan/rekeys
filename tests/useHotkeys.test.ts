import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { useHotkeys } from "../src/useHotkeys";

describe("useHotkeys", () => {
  it("fires callback when matching key is pressed", () => {
    const callback = vi.fn();
    renderHook(() => useHotkeys("ctrl+k", callback));

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(callback).toHaveBeenCalled();
  });

  it("does not call the callback when a different key is pressed", () => {
    const callback = vi.fn();
    renderHook(() => useHotkeys("ctrl+k", callback));

    fireEvent.keyDown(window, { key: "k" });
    expect(callback).not.toHaveBeenCalled();
  });

  it("does not fire when `when` is false", () => {
    const callback = vi.fn();
    renderHook(() => useHotkeys("ctrl+k", callback, { when: false }));

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(callback).not.toHaveBeenCalled();
  });

  it("calls preventDefault when option is set", () => {
    const callback = vi.fn();
    const spy = vi.spyOn(KeyboardEvent.prototype, "preventDefault");

    renderHook(() => useHotkeys("ctrl+k", callback, { preventDefault: true }));
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("fires the correct callback for multiple combos", () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    renderHook(() =>
      useHotkeys([
        ["ctrl+k", callback1],
        ["ctrl+s", callback2],
      ]),
    );

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    fireEvent.keyDown(window, { key: "s", ctrlKey: true });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it("does not fire after unmount", () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useHotkeys("ctrl+k", callback));

    unmount();
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });

    expect(callback).not.toHaveBeenCalled();
  });
});
