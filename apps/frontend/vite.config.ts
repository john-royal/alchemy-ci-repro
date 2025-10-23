import { cloudflare } from "@cloudflare/vite-plugin"
import { reactRouter } from "@react-router/dev/vite"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import alchemy from "alchemy/cloudflare/react-router"

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

