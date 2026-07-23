import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppNav } from "./AppNav";

const mocks = vi.hoisted(() => ({ usePathname: vi.fn() }));
vi.mock("next/navigation", () => ({ usePathname: mocks.usePathname }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/songs", label: "Songs" },
];

describe("AppNav", () => {
  it("marks the link matching the current pathname as active", () => {
    mocks.usePathname.mockReturnValue("/songs");
    render(<AppNav links={links} />);
    expect(screen.getByRole("link", { name: "Songs" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("link", { name: "Dashboard" }).getAttribute("aria-current"),
    ).toBeNull();
  });

  it("treats the root link as active only on an exact match", () => {
    mocks.usePathname.mockReturnValue("/songs");
    render(<AppNav links={links} />);
    expect(
      screen.getByRole("link", { name: "Dashboard" }).getAttribute("aria-current"),
    ).toBeNull();
  });

  it("renders the optional right slot", () => {
    mocks.usePathname.mockReturnValue("/");
    render(<AppNav links={links} right={<span>mix → measure → improve</span>} />);
    expect(screen.getByText("mix → measure → improve")).toBeTruthy();
  });
});
