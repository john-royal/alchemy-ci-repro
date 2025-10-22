import { isbot } from "isbot"
import { renderToReadableStream } from "react-dom/server"
import {
  ServerRouter,
  type EntryContext,
  type RouterContextProvider,
} from "react-router"

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  entryContext: EntryContext,
  routerContext: RouterContextProvider,
) {
  // const matchedRoutes = entryContext.staticHandlerContext.matches

  // const requiredNamespaces = matchedRoutes.reduce((acc, { route }) => {
  //   if (route.handle?.i18n?.namespaces) {
  //     acc.push(...route.handle.i18n.namespaces)
  //   }
  //   return acc
  // }, [] as string[])

  // const uniqueNamespaces = [...new Set(requiredNamespaces)]

  // console.log("uniqueNamespaces", uniqueNamespaces)

  let shellRendered = false
  const userAgent = request.headers.get("user-agent")

  const body = await renderToReadableStream(
    <ServerRouter context={entryContext} url={request.url} />,
    {
      onError(error: unknown) {
        responseStatusCode = 500
        if (shellRendered) {
          console.error(error)
        }
      },
    },
  )
  shellRendered = true

  if ((userAgent && isbot(userAgent)) || entryContext.isSpaMode) {
    await body.allReady
  }

  responseHeaders.set("Content-Type", "text/html")
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}
