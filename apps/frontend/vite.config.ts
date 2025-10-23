import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { cloudflare } from "@cloudflare/vite-plugin"
import { reactRouter } from "@react-router/dev/vite"
import alchemy from "alchemy/cloudflare/react-router"
import { defineConfig, type PluginOption } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: __dirname,
  logLevel: "info",
  plugins: [
    // ❌ FAILS: Rolldown failed to resolve import "cloudflare:workers"
    alchemy() as PluginOption,

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

    // ✅ WORKAROUND: Comment alchemy and uncomment this (though may also fail with rolldown-vite)
    // cloudflare({
    //   viteEnvironment: { name: "ssr" },
    // }),

    reactRouter(),
    tsconfigPaths(),
  ],
})

