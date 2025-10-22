import { Links, Meta, Outlet, Scripts } from "react-router"
import { toastMiddleware, getToast } from "./middleware/toast.server"

export const middleware = [toastMiddleware]

export async function loader() {
  const toast = getToast()
  return { toast }
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}

