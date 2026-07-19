import { THEME_STORAGE_KEY } from "../theme/useTheme";

// Runs synchronously, before hydration, in <head> - so first paint already
// has the right theme class instead of flashing light and correcting a
// moment later. Every cross-app navigation in this ecosystem loads a fresh
// Next.js document (each app zone is its own app), so this isn't just a
// first-visit concern, it fires on every such navigation. Must stay
// dependency-free, synchronous, and side-effect-only - it runs before
// React exists.
const script = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});var d=s==="dark"||(s!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
