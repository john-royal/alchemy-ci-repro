import { AsyncLocalStorage } from "node:async_hooks"
import { type MiddlewareFunction } from "react-router"
import { type Toast } from "../types"

export interface ToastContext {
  toast: Toast | null
}

declare global {
  var ToastStorage: AsyncLocalStorage<ToastContext>
}

export const ToastStorage: AsyncLocalStorage<ToastContext> =
  (globalThis.ToastStorage ??= new AsyncLocalStorage<ToastContext>())

export function createToastMiddleware(): [
  MiddlewareFunction<Response>,
  (toast: Toast) => void,
  () => Toast | null,
] {
  const middleware: MiddlewareFunction<Response> = async ({ request }, next) => {
    if (ToastStorage.getStore()) {
      return next()
    }

    const toastContextValue: ToastContext = { toast: null }

    return ToastStorage.run(toastContextValue, async () => {
      return await next()
    })
  }

  function setToast(toast: Toast): void {
    const context = ToastStorage.getStore()
    if (!context) throw new Error("Toast context not found")
  }

  function getToast(): Toast | null {
    const context = ToastStorage.getStore()
    if (!context) throw new Error("Toast context not found")
    return context.toast
  }

  return [middleware, setToast, getToast]
}



