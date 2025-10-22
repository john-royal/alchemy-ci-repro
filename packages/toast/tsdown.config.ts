import { defineConfig } from "tsdown"

export default defineConfig({
  entry: {
    "server/index": "./src/server/index.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  platform: "neutral",
  target: "es2022",
  treeshake: true,
  minify: false,
})

