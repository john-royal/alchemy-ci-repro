# Alchemy Plugin CI Build Failure Reproduction

## Bug Summary

Build fails in CI when using Alchemy plugin but succeeds with standard Cloudflare Vite plugin. Works perfectly locally, fails consistently in GitHub Actions.

## Setup

```bash
bun install
cd packages/toast && bun run build && cd ../..
cd apps/frontend
bun react-router build
```

## To Test

### Test with Alchemy (fails in CI)
Currently configured. Just run build.

### Test with Cloudflare plugin (works in CI)
Edit `apps/frontend/vite.config.ts`:
- Comment out the `alchemy()` plugin
- Uncomment the `cloudflare()` plugin
- Run `bun react-router build`

## Key Files

- `vite.config.ts` - Switch between Alchemy and Cloudflare plugins
- `app/middleware/toast.server.ts` - File that triggers the error
- `bunfig.toml` - Strict peer dependency resolution

## Expected Result

- ✅ Local: Build may succeed with Alchemy plugin in some environments
- ❌ CI: Build fails with Alchemy plugin - manifests as zod module resolution error or cloudflare:workers import error
- ✅ Local: Standard Cloudflare plugin works as reference

## CI Workflow

This repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

1. **Build with Alchemy Plugin** - Demonstrates the failure in CI environment
2. **Build with Cloudflare Plugin** - Demonstrates the workaround by switching plugins

The workflow runs on `ubuntu-latest` with Node.js 24 and Bun 1.3.0, matching the environment where the bug occurs.

## Current Reproduction Status

This reproduction demonstrates a **build failure** that occurs when using:
- Alchemy plugin with rolldown-vite
- cloudflare:workers imports in middleware
- React Router 7 SSR setup

The error manifests as:
```
Error: [vite]: Rolldown failed to resolve import "cloudflare:workers" from "..."
```

This failure may manifest differently in CI environments and could also surface as a zod module resolution error (Missing "./v4/core" specifier in "zod" package) depending on the build environment and caching behavior.

## Reproduction Points

1. **Strict peer dependency resolution** (`peer = false` in bunfig.toml) - CRITICAL
2. **Zod v4** with subpath exports (`zod/v4/core`)
3. **Workspace package** that has zod as peer dependency
4. **Alchemy plugin** configuration with persistState
5. **cloudflare:workers** import in middleware
6. **React Router 7** with future flags and v8_middleware
7. **Bun workspaces** with catalog versioning
8. **Production build** (NODE_ENV=production)

## CI Simulation

To simulate CI conditions that trigger the failure:

```bash
# Clean everything
rm -rf apps/frontend/.react-router apps/frontend/build node_modules/.cache

# Set production environment
export NODE_ENV=production

# Build workspace package first
cd packages/toast && bun run build && cd ../..

# Try to build the app (should fail in CI)
cd apps/frontend
bun react-router build
```

## Error Messages to Reproduce

### Error 1: Standard Vite (rolldown-vite)
```
[commonjs--resolver] Missing "./v4/core" specifier in "zod" package
    at e
(file:///path/to/node_modules/.bun/vite@7.1.11/node_modules/vite/dist/node/chunks/config.js:8837:8)
```

### Error 2: Alternative with Rolldown
```
Error: [vite]: Rolldown failed to resolve import "cloudflare:workers" from
"/path/to/app/middleware/toast.server.ts"
```

## Testing Variations

The reproduction allows testing:

1. With Alchemy plugin (currently configured - should fail in CI)
2. With Cloudflare plugin (comment/uncomment in vite.config.ts - should work)
3. Different Vite versions (standard vs rolldown)

## Expected Behavior

### Local Environment (macOS, Bun 1.3.0)
- ✅ Build succeeds with Alchemy plugin
- ✅ Build succeeds with Cloudflare plugin

### CI Environment (ubuntu-latest, GitHub Actions, Bun 1.3.0)
- ❌ Build fails with Alchemy plugin at final build stage
- ✅ Build succeeds with Cloudflare plugin

