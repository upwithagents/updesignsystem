import { defineConfig } from "tsup";
import { cpSync } from "node:fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  banner: { js: '"use client";' },
  clean: true,
  external: ["react", "react-dom"],
  onSuccess: async () => {
    cpSync("src/styles/theme.css", "dist/styles.css");
  },
});
