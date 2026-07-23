import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export interface AppNavLink {
  href: string;
  label: string;
}

export interface AppNavProps {
  /** Route links for this app's own pages, shown left-aligned as pill tabs. */
  links: AppNavLink[];
  /** Optional content (tagline, actions) shown at the right edge of the bar. */
  right?: ReactNode;
}

export function AppNav({ links, right }: AppNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 border-b border-(--border) px-6 py-3">
      <div className="flex flex-wrap gap-1">
        {links.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "rounded-(--radius-md) bg-linear-to-b from-(--color-accent-hot) to-(--color-accent) px-3 py-1.5 text-sm font-medium text-(--color-accent-foreground) shadow-[0_1px_2px_color-mix(in_srgb,var(--color-accent)_35%,transparent),0_3px_10px_color-mix(in_srgb,var(--color-accent)_22%,transparent)] transition-all hover:brightness-110"
                  : "rounded-(--radius-md) px-3 py-1.5 text-sm font-medium text-(--muted-foreground) transition-colors hover:bg-(--muted) hover:text-(--foreground)"
              }
            >
              {link.label}
            </Link>
          );
        })}
      </div>
      {right}
    </nav>
  );
}
