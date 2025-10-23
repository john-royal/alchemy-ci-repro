import { reactRouter } from "@react-router/dev/vite"
import alchemy from "alchemy/cloudflare/react-router"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: __dirname,
  logLevel: "info",
  plugins: [
    alchemy(),
    reactRouter(),
    tsconfigPaths(),
  ],
})

