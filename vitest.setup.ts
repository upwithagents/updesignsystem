import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom does not implement matchMedia; polyfill it globally so any component
// that reads prefers-color-scheme (e.g. via useTheme) can render in tests.
vi.stubGlobal(
  "matchMedia",
  vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }),
);
