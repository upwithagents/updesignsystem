import { useEffect, useState, useCallback } from "react";

export const THEME_STORAGE_KEY = "upwithagents-theme";
const STORAGE_KEY = THEME_STORAGE_KEY;
type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

function systemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function storedPreference(): Theme | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "dark" || raw === "light" ? raw : null;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  // Starts at a fixed default rather than reading localStorage/matchMedia
  // in the initializer: that logic only sees real values on the client,
  // so if it ran during the initial render it would produce a different
  // result than the server did, causing a hydration mismatch. The real
  // preference is read (and, in the effect below, applied) on mount
  // instead, which only ever runs on the client, after hydration.
  const [theme, setThemeState] = useState<Theme>("light");
  // Guards the apply-on-change effect from firing with the SSR-safe
  // "light" default before the mount effect has determined the real
  // theme - without this, every mount (including every cross-app
  // navigation, since each app zone is its own Next.js document) would
  // briefly force light mode before immediately correcting back to dark.
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setThemeState(storedPreference() ?? systemTheme());
    setResolved(true);
  }, []);

  useEffect(() => {
    if (!resolved) return;
    applyTheme(theme);
  }, [theme, resolved]);

  useEffect(() => {
    if (storedPreference()) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setThemeState(systemTheme());
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((pref: ThemePreference) => {
    if (pref === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
      setThemeState(systemTheme());
    } else {
      window.localStorage.setItem(STORAGE_KEY, pref);
      setThemeState(pref);
    }
  }, []);

  return { theme, setTheme };
}
