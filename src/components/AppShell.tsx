import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";

export interface AppShellProps {
  nav: ReactNode;
  children: ReactNode;
}

export function AppShell({ nav, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[--background] text-[--foreground]">
      <header className="flex items-center justify-between border-b border-[--border] px-6 py-3">
        <nav className="flex items-center gap-4">{nav}</nav>
        <ThemeToggle />
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-6">{children}</main>
    </div>
  );
}
