import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PortalHeader } from "./PortalHeader";

const apps = [
  { slug: "walletup", name: "WalletUp", icon: "💰" },
  { slug: "sheetup", name: "SheetUp", icon: "🎼" },
];

describe("PortalHeader", () => {
  it("shows a login link when no user", () => {
    render(<PortalHeader apps={[]} loginHref="/login" />);
    expect(screen.getByRole("link", { name: /log in/i })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("toggles the app switcher and links to zones", () => {
    render(<PortalHeader apps={apps} userName="Laci" userEmail="l@x.io" />);
    expect(screen.queryByRole("link", { name: /WalletUp/ })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /apps/i }));
    expect(screen.getByRole("link", { name: /WalletUp/ })).toHaveAttribute(
      "href",
      "/walletup",
    );
  });

  it("marks the current app", () => {
    render(
      <PortalHeader apps={apps} currentSlug="sheetup" userName="Laci" />,
    );
    fireEvent.click(screen.getByRole("button", { name: /apps/i }));
    expect(
      screen.getByRole("link", { name: /SheetUp/ }).getAttribute("aria-current"),
    ).toBe("page");
  });

  it("shows the current app's icon and name in the header without opening the switcher", () => {
    render(
      <PortalHeader apps={apps} currentSlug="sheetup" userName="Laci" />,
    );
    expect(screen.getByText("SheetUp")).toBeTruthy();
  });

  it("renders the logout slot inside the user menu", () => {
    render(
      <PortalHeader
        apps={apps}
        userName="Laci"
        logoutSlot={<button>Log out</button>}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Laci/ }));
    expect(screen.getByRole("button", { name: /log out/i })).toBeTruthy();
  });
});
