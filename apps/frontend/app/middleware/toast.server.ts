import { createToastMiddleware } from "@repro/toast/server"
import { env } from "cloudflare:workers"
import { createCookieSessionStorage } from "react-router"

const toastSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "toast",
    sameSite: "lax",
    secure: true,
    httpOnly: true,
    path: "/",
    secrets: [env.SESSION_SECRET || "test-secret"],
  },
})

export const [toastMiddleware, setToast, getToast] =
  createToastMiddleware()

