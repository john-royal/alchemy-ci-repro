import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"
// import { cloudflare } from "@cloudflare/vite-plugin"
import { reactRouter } from "@react-router/dev/vite"
import alchemy from "alchemy/cloudflare/react-router"
import { defineConfig, type PluginOption } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: __dirname,
  logLevel: "info",
  plugins: [
    // ❌ FAILS IN CI: Missing "./v4/core" specifier in "zod" package
    alchemy({
      persistState: {
        path: path.join(__dirname, ".alchemy", "miniflare"),
      },
      viteEnvironment: { name: "ssr" },
    }) as PluginOption,

    // ✅ WORKS IN CI: Comment alchemy and uncomment this
    // cloudflare({
    //   viteEnvironment: { name: "ssr" },
    //   persistTo: path.join(__dirname, ".wrangler"),
    // }),

    reactRouter(),
    tsconfigPaths(),
  ],
})

