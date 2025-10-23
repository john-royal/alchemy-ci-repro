import { cloudflare } from "@cloudflare/vite-plugin"
import { reactRouter } from "@react-router/dev/vite"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: __dirname,
  logLevel: "info",
  plugins: [

    {
      name: "alchemy-supress-watch",
      config() {
        return {
          server: {
            watch: {
              ignored: ["**/.alchemy/**"],
            },
          },
        }
      }
    },
    cloudflare({
      configPath: ".alchemy/local/wrangler.jsonc",
      persistState: {path: ".alchemy/miniflare"},
    }),

    reactRouter(),
    tsconfigPaths(),
  ],
})

