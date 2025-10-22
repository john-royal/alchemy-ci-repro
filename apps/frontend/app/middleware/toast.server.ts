import { createToastMiddleware } from "@repro/toast/server"
import { createCookieSessionStorage } from "react-router"
import { env } from "cloudflare:workers"

const toastSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "toast",
    sameSite: "lax",
    secure: false, // Allow insecure cookies in dev mode
    httpOnly: true,
    path: "/",
    secrets: [env.VALUE_FROM_CLOUDFLARE],
  },
})

// In Cloudflare Workers, createToastMiddleware uses AsyncLocalStorage which doesn't work
// For now, we'll create a simple no-op middleware
export const [toastMiddleware, setToast, getToast] =
  createToastMiddleware()


