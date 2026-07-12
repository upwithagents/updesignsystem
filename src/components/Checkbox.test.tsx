import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("calls onCheckedChange with the new value when clicked", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox checked={false} onCheckedChange={onCheckedChange} label="Accept" />);
    fireEvent.click(screen.getByRole("checkbox", { name: "Accept" }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
