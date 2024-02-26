import { type Expense } from '../../domain/entities/expense.entity'
import { type Repository } from '../../infra/protocols/repository-interface'
import { type UseCase } from '../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../shared/erros/not-found-error.er'

export type UpdateExpenseInput = {
  expense_id: string
  description?: string
  data?: Date
  user_owner?: any
  value?: number
}
// TODO updated_at is missing!
export type UpdateExpenseOutPut = {
  expense_id: string
  description?: string
  data?: Date
  user_owner?: any
  value?: number
}

export class UpdateExpenseUseCase implements UseCase<UpdateExpenseInput, UpdateExpenseOutPut> {
  constructor (
    private readonly repository: Repository<Expense>
  ) {}

  async execute (input: UpdateExpenseInput): Promise<UpdateExpenseOutPut> {
    const expense = await this.repository.find(input.expense_id)

    if (!expense) throw new NotFoundError()

    input.description && expense.changeDescription(input.description)
    input.value && expense.changeValue(input.value)

    await this.repository.update(expense)

    return {
      expense_id: expense.expense_id.id,
      description: expense.description,
      data: expense.data,
      user_owner: expense.user_owner,
      value: expense.value
    }
  }
}
