import { z } from 'zod'

export const FindCarInput = z.string().length(36)

export const CreateCarInput = z.object({
  description: z.string().max(195),
  user_owner: z.string().length(36),
  value: z.number().min(0),
  data: z.string().optional()
})
