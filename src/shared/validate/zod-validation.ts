import { z } from 'zod'

export const ShortUrl = z.string().min(6)

export const FindInputUpdateUser = z.object({
  user_id: z.string().length(36),
  name: z.string()
})

export const CreateUserInputValidate = z.object({
  name: z.string().max(30),
  email: z.string().max(30),
  password: z.string().max(30)
})
