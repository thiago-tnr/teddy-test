import { inject, injectable } from 'tsyringe'
import { Expense } from '../../../domain/entities/expense.entity'
import { Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'

export type CreateExpenseInput = {
  description: string
  user_owner: any
  value: number
}
export type CreateExpenseOutPut = {
  expense_id: string
  description: string
  data: Date | string
  user_owner: any
  value: number
}
@injectable()
export class CreateExpenseUseCase implements UseCase<CreateExpenseInput, CreateExpenseOutPut> {
  constructor (
    @inject('ExpenseRepository')
    private readonly repository: Repository<Expense>
  ) { }

  async execute (input: CreateExpenseInput): Promise<CreateExpenseOutPut> {
    const expense = Expense.create(input)
    await this.repository.create(expense)

    return {
      expense_id: expense.expense_id.id,
      description: expense.description,
      data: expense.data,
      user_owner: expense.user_owner,
      value: expense.value
    }
  }
}
