import { z } from 'zod'

export const FindInput = z.string().length(36)

export const CreateExpenseInput = z.object({
  description: z.string().max(191),
  user_owner: z.string().length(36),
  value: z.number().min(0),
  data: z.string().optional()
})

export const UpdateExpenseInput = z.object({
  expense_id: z.string().length(36),
  description: z.string().max(191).optional(),
  value: z.number().min(0).optional()
})

export const CreateUserInputValidate = z.object({
  name: z.string().max(30),
  email: z.string().email(),
  password: z.string().min(6).max(10)
})

export const LoginValidate = z.object({
  email: z.string().email(),
  password: z.string()
})
