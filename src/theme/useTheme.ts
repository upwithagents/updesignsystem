import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "upwithagents-theme";
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
  // preference is read and applied in an effect below instead, which
  // only ever runs on the client, after hydration.
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setThemeState(storedPreference() ?? systemTheme());
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

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
