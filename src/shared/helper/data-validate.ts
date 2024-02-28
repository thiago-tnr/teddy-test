import { InvalidParamError } from '../erros/invalid-param.er'

export const dataValidate = async (data: string): Promise<string> => {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(data)) {
    throw new InvalidParamError('Invalid date format. Expected YYYY-MM-DD.')
  }

  const [year, month, day] = data.split('-').map(Number)

  const dueDate = new Date(year, month - 1, day, 23, 59, 59)
  const currentDate = new Date()

  const today = JSON.parse(JSON.stringify(new Date()))

  if (data === today.split('T')[0]) {
    return JSON.parse(JSON.stringify(currentDate))
  } else if (data < today.split('T')[0]) {
    return JSON.parse(JSON.stringify(new Date(data)))
  }

  if (dueDate.getTime() > currentDate.getTime()) {
    throw new InvalidParamError('The informed date is after the current date.')
  }

  return JSON.parse(JSON.stringify(currentDate))
}
