import { inject, injectable } from 'tsyringe'
import { type Expense } from '../../../domain/entities/expense.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

export type FindExpenseInput = {
  expense_id: string
}
// TODO updated_at is missing!
export type FindExpenseOutPut = {
  expense_id: string
  description?: string
  data?: Date
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

    return {
      expense_id: expense.expense_id.id,
      description: expense.description,
      data: expense.data,
      user_owner: expense.user_owner,
      value: expense.value
    }
  }
}
