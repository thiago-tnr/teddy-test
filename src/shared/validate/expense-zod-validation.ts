import { z } from 'zod'

export const FindExpenseInput = z.string().length(36)

export const CreateExpenseInput = z.object({
  description: z.string().max(195),
  user_owner: z.string().length(36),
  value: z.number().min(0),
  data: z.string().optional()
})
