import { type Config } from "@react-router/dev/config"

export default {
  ssr: true,
  future: {
    unstable_viteEnvironmentApi: true,
    unstable_splitRouteModules: true,
    unstable_subResourceIntegrity: true,
    unstable_optimizeDeps: true,
    v8_middleware: true,
  },
} satisfies Config


