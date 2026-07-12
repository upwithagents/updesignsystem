import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children and responds to clicks", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies the pill radius and accent background for the primary variant", () => {
    render(<Button variant="primary">Go</Button>);
    const btn = screen.getByRole("button", { name: "Go" });
    expect(btn.className).toContain("rounded-[--radius-pill]");
    expect(btn.className).toContain("bg-[--color-accent]");
  });
});
