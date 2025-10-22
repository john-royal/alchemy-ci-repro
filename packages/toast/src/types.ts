import { z } from "zod"

export const toastSchema = z.object({
  title: z.string(),
  type: z.enum(["info", "success", "error"]),
})

export type Toast = z.infer<typeof toastSchema>

