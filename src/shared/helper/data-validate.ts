import { InvalidParamError } from '../erros/invalid-param.er'

export const dataValidate = (data: string): string => {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(data)) {
    throw new InvalidParamError('Invalid date format. Expected YYYY-MM-DD.')
  }

  // Parse date string using destructuring
  const [year, month, day] = data.split('-').map(Number)

  // Create Date object with zero-based month (January = 0)
  const dueDate = new Date(year, month - 1, day, 23, 59, 59)
  const currentDate = new Date()

  // Compare dates in milliseconds and throw error if invalid
  if (dueDate.getTime() < currentDate.getTime()) {
    throw new InvalidParamError('The informed date is before the current date.')
  }

  // Return formatted due date in US format
  return JSON.parse(JSON.stringify(currentDate))
}
