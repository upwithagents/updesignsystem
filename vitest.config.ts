import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    // Node 22+ ships its own global localStorage/sessionStorage, which
    // collides with jsdom's: without a configured --localstorage-file it's
    // only partially functional (e.g. .clear() isn't a function), and it
    // takes priority over jsdom's own implementation. Disable it so jsdom's
    // localStorage is the only one in play.
    poolOptions: {
      forks: { execArgv: ["--no-experimental-webstorage"] },
      threads: { execArgv: ["--no-experimental-webstorage"] },
    },
  },
});
