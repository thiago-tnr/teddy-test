import { inject, injectable } from 'tsyringe'
import { type Expense } from '../../../domain/entities/expense.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { UnauthorizedError } from '../../../shared/erros/unauthorized-error.er'

export type FindExpenseInput = {
  expense_id: string
  user_id: string
}
// TODO updated_at is missing!
export type FindExpenseOutPut = {
  expense_id: string
  description?: string
  data?: Date | string
  user_owner?: any
  value?: number
}
@injectable()
export class FindExpenseUseCase implements UseCase<FindExpenseInput, FindExpenseOutPut> {
  constructor (
    @inject('ExpenseRepository')
    private readonly repository: Repository<Expense>
  ) { }

  async execute (input: FindExpenseInput): Promise<FindExpenseOutPut> {
    const expense = await this.repository.find(input.expense_id)

    if (!expense) throw new NotFoundError()

    if (expense?.user_owner !== input.user_id) throw new UnauthorizedError('Unauthorized')

    return {
      expense_id: expense.expense_id.id,
      description: expense.description,
      data: expense.data,
      user_owner: expense.user_owner,
      value: expense.value
    }
  }
}
