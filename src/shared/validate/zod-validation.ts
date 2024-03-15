import { z } from 'zod'

export const FindInput = z.string().length(36)

export const FindInputUpdateUser = z.object({
  user_id: z.string().length(36),
  name: z.string()
})
export const CreateCarInput = z.object({
  plate: z.string().max(7),
  color: z.string(),
  brand: z.string()
})

export const UpdateCarInput = z.object({
  car_id: z.string().max(36),
  plate: z.string().max(7).optional(),
  color: z.string().optional(),
  brand: z.string().optional()
})

export const CreateUserInputValidate = z.object({
  name: z.string().max(30)
})
