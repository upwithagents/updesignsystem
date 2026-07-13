import { useState, type ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";

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

  return (
    <header className="relative z-40 flex items-center justify-between border-b border-(--border) bg-(--background) px-6 py-3">
      <div className="flex items-center gap-5">
        <a href="/" className="text-lg font-semibold tracking-tight text-(--foreground)">
          up<span className="text-(--color-accent)">with</span>agents
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
                    aria-current={app.slug === currentSlug ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-(--radius-md) px-3 py-2 text-sm hover:bg-(--muted) ${
                      app.slug === currentSlug
                        ? "bg-(--muted) font-medium text-(--color-accent)"
                        : "text-(--foreground)"
                    }`}
                  >
                    <span aria-hidden>{app.icon}</span>
                    {app.name}
                  </a>
                ))}
              </nav>
            )}
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
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--color-accent) text-xs font-semibold text-(--color-accent-foreground)">
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
