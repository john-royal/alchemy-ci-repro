import alchemy from "alchemy"
import { ReactRouter } from "alchemy/cloudflare"
import { FileSystemStateStore } from "alchemy/state"

const app = await alchemy("alchemy-ci-repro", {
  stateStore: (scope) => new FileSystemStateStore(scope),
})

export const worker = await ReactRouter("frontend", {
  main: "./app/entry.server.tsx",
  bindings: {
    SESSION_SECRET: alchemy.secret(process.env.SESSION_SECRET || "test-secret"),
  },
  url: true,
})

await app.finalize()
