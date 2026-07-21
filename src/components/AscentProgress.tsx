"use client";

import { useEffect, useState } from "react";

const NAV_PENDING_KEY = "ascent-nav-pending";
const START_EVENT = "ascent-progress:start";

/**
 * Call from an onClick handler right before a same-origin hard navigation
 * (e.g. switching to another app) so the destination page's AscentProgress
 * picks up and finishes the bar on mount.
 */
export function startAscentProgress() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(NAV_PENDING_KEY, "1");
  window.dispatchEvent(new CustomEvent(START_EVENT));
}

// Notched-arrowhead silhouette from the Ascent graphic, reused here as the
// caret riding the progress bar's leading edge.
const ARROW_MARK = "M50,30 L78,66 L50,55 L22,66 Z";

export interface AscentProgressProps {
  /**
   * "auto" (default): hidden until startAscentProgress() fires, or until
   * mount if sessionStorage shows a navigation was just triggered - then
   * finishes and fades. Mount this once per app, alongside its header.
   *
   * "static": always visible and trickling; for use inside a Suspense
   * `loading.tsx`, which unmounts it once the route's data resolves.
   */
  mode?: "auto" | "static";
}

export function AscentProgress({ mode = "auto" }: AscentProgressProps) {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(mode === "static");

  useEffect(() => {
    if (mode === "static") {
      setWidth(30);
      const trickle = window.setTimeout(() => setWidth(85), 200);
      return () => window.clearTimeout(trickle);
    }

    const arrivedFromNav = window.sessionStorage.getItem(NAV_PENDING_KEY) === "1";
    if (arrivedFromNav) {
      window.sessionStorage.removeItem(NAV_PENDING_KEY);
      setVisible(true);
      setWidth(92);
      const finish = window.setTimeout(() => setWidth(100), 120);
      const fade = window.setTimeout(() => setVisible(false), 450);
      const reset = window.setTimeout(() => setWidth(0), 650);
      return () => {
        window.clearTimeout(finish);
        window.clearTimeout(fade);
        window.clearTimeout(reset);
      };
    }

    function handleStart() {
      setVisible(true);
      setWidth(30);
      window.setTimeout(() => setWidth(90), 200);
    }
    window.addEventListener(START_EVENT, handleStart);
    return () => window.removeEventListener(START_EVENT, handleStart);
  }, [mode]);

  if (!visible && width === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      <div
        className="relative h-full"
        style={{
          width: `${width}%`,
          transition: "width 400ms cubic-bezier(0.2,0.6,0.4,1)",
          background: "linear-gradient(90deg, var(--color-accent-hot), var(--color-amber))",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute -right-2 -top-[3px] h-[9px] w-[9px] drop-shadow-[0_0_4px_var(--color-accent-hot)]"
        >
          <path d={ARROW_MARK} fill="var(--color-amber)" transform="rotate(90 50 50)" />
        </svg>
      </div>
    </div>
  );
}
