import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })
    );
  });

  it("defaults to system preference (light) and applies no dark class", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("setTheme('dark') applies the dark class and persists to localStorage", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setTheme("dark"));
    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("upwithagents-theme")).toBe("dark");
  });

  it("setTheme('system') clears the stored override", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setTheme("dark"));
    act(() => result.current.setTheme("system"));
    expect(localStorage.getItem("upwithagents-theme")).toBeNull();
  });

  it("mounting with a stored dark preference never toggles the dark class off first (no flicker)", () => {
    localStorage.setItem("upwithagents-theme", "dark");
    const toggleSpy = vi.spyOn(document.documentElement.classList, "toggle");
    renderHook(() => useTheme());
    // applyTheme() is a classList.toggle("dark", isDark) call - the bug this
    // guards against called it once with false (the SSR-safe "light"
    // default) before immediately correcting with true, which is what
    // caused the visible flash on every mount (i.e. every cross-app
    // navigation, since each app zone is its own Next.js document).
    const darkCalls = toggleSpy.mock.calls.filter(([cls]) => cls === "dark");
    expect(darkCalls).toEqual([["dark", true]]);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
