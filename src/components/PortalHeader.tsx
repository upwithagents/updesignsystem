import { useState, type ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { AppIcon } from "./AppIcon";
import { startAscentProgress } from "./AscentProgress";

export interface PortalHeaderApp {
  slug: string;
  name: string;
  icon: string;
}

export interface PortalHeaderProps {
  /** Subscribed apps shown in the collapsible switcher. Empty hides it. */
  apps: PortalHeaderApp[];
  /** Slug of the app currently being viewed, if any. */
  currentSlug?: string;
  userName?: string;
  userEmail?: string;
  /** Portal-supplied logout control (e.g. a server-action form). */
  logoutSlot?: ReactNode;
  /** Where the "Log in" link points when there is no user. */
  loginHref?: string;
}

export function PortalHeader({
  apps,
  currentSlug,
  userName,
  userEmail,
  logoutSlot,
  loginHref = "/login",
}: PortalHeaderProps) {
  const [appsOpen, setAppsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const currentApp = apps.find((app) => app.slug === currentSlug);

  return (
    <header className="relative z-40 flex items-center justify-between border-b border-(--border) bg-(--background) px-6 py-3">
      <div className="flex items-center gap-5">
        <a href="/" className="flex items-center gap-[0.55rem]" aria-label="upwithagents">
          <svg viewBox="0 0 100 100" width="26" height="26" className="rounded-[6px] shrink-0" aria-hidden="true">
            <defs>
              <clipPath id="uwa-sq"><rect width="100" height="100" rx="22" /></clipPath>
              <linearGradient id="uwa-cA" x1="56" y1="0" x2="100" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#FFB020" />
                <stop offset="1" stopColor="#EB4E10" />
              </linearGradient>
              <linearGradient id="uwa-cB" x1="0" y1="56" x2="44" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#EB4E10" />
                <stop offset="1" stopColor="#B8380A" />
              </linearGradient>
            </defs>
            <g clipPath="url(#uwa-sq)">
              <rect width="100" height="100" fill="#14100c" />
              <path d="M56,0 L100,0 L100,44 Z" fill="url(#uwa-cA)" />
              <path d="M0,56 L0,100 L44,100 Z" fill="url(#uwa-cB)" />
              <path d="M50,25 L86,71 L50,57 L14,71 Z" fill="#fff8f0" />
            </g>
          </svg>
          <span className="font-(family-name:--font-display) text-lg font-semibold tracking-[-0.015em] leading-none whitespace-nowrap text-(--foreground)">
            <span aria-hidden="true">
              up
              <span className="text-(--color-accent)">
                w
                <span className="relative">
                  ı
                  <span className="absolute left-1/2 -top-[0.02em] h-[0.5em] w-[0.5em] -translate-x-1/2 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="block h-full w-full" aria-hidden="true">
                      <path d="M50,30 L78,66 L50,55 L22,66 Z" fill="currentColor" />
                    </svg>
                  </span>
                </span>
                th
              </span>
              agents
            </span>
          </span>
        </a>
        {apps.length > 0 && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setAppsOpen((v) => !v)}
              aria-expanded={appsOpen}
              className="rounded-(--radius-pill) border border-(--border) px-3 py-1 text-sm text-(--foreground) hover:bg-(--muted)"
            >
              Apps {appsOpen ? "▴" : "▾"}
            </button>
            {appsOpen && (
              <nav className="absolute left-0 mt-2 w-56 rounded-(--radius-lg) border border-(--border) bg-(--background) p-2 shadow-lg">
                {apps.map((app) => (
                  <a
                    key={app.slug}
                    href={`/${app.slug}`}
                    onClick={() => app.slug !== currentSlug && startAscentProgress()}
                    aria-current={app.slug === currentSlug ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-(--radius-md) px-3 py-2 text-sm hover:bg-(--muted) ${
                      app.slug === currentSlug
                        ? "bg-(--muted) font-medium text-(--color-accent)"
                        : "text-(--foreground)"
                    }`}
                  >
                    <AppIcon slug={app.slug} size={24} />
                    {app.name}
                  </a>
                ))}
              </nav>
            )}
          </div>
        )}
        {currentApp && (
          <div className="flex items-center gap-2 text-sm font-medium text-(--foreground)">
            <AppIcon slug={currentApp.slug} size={22} />
            {currentApp.name}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {userName ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserOpen((v) => !v)}
              aria-expanded={userOpen}
              className="flex items-center gap-2 rounded-(--radius-pill) border border-(--border) px-3 py-1 text-sm text-(--foreground) hover:bg-(--muted)"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-(--color-accent-hot) to-(--color-accent) text-xs font-semibold text-(--color-accent-foreground)">
                {userName.charAt(0).toUpperCase()}
              </span>
              {userName}
            </button>
            {userOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-(--radius-lg) border border-(--border) bg-(--background) p-3 shadow-lg">
                <p className="text-sm font-medium text-(--foreground)">{userName}</p>
                {userEmail && (
                  <p className="mt-0.5 truncate text-xs text-(--muted-foreground)">{userEmail}</p>
                )}
                <div className="mt-3 border-t border-(--border) pt-3">{logoutSlot}</div>
              </div>
            )}
          </div>
        ) : (
          <a
            href={loginHref}
            className="rounded-(--radius-pill) bg-(--color-accent) px-4 py-1.5 text-sm font-medium text-(--color-accent-foreground) hover:bg-(--color-accent-hover)"
          >
            Log in
          </a>
        )}
      </div>
    </header>
  );
}
