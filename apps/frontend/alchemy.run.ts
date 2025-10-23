import alchemy from "alchemy"
import { ReactRouter } from "alchemy/cloudflare"
import { FileSystemStateStore } from "alchemy/state"

const app = await alchemy("alchemy-ci-repro", {
  stateStore: (scope) => new FileSystemStateStore(scope),
})

export const worker = await ReactRouter("frontend", {
  main: "./workers/app.ts",
  bindings: {
    SESSION_SECRET: alchemy.secret(process.env.SESSION_SECRET || "test-secret"),
    VALUE_FROM_CLOUDFLARE: alchemy.secret(process.env.VALUE_FROM_CLOUDFLARE || "Hello from Cloudflare"),
  },
  compatibilityFlags: ["nodejs_compat", "nodejs_compat_populate_process_env"],
  url: true,
  adopt: true
})

await app.finalize()
