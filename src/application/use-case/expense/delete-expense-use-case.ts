import { inject, injectable } from 'tsyringe'
import { type Expense } from '../../../domain/entities/expense.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

export type DeleteExpenseInput = {
  expense_id: string
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type DeleteExpenseOutPut = void
@injectable()
export class DeleteExpenseUseCase implements UseCase<DeleteExpenseInput, DeleteExpenseOutPut> {
  constructor (
    @inject('ExpenseRepository')
    private readonly repository: Repository<Expense>
  ) { }

  async execute (input: DeleteExpenseInput): Promise<DeleteExpenseOutPut> {
    const expense = await this.repository.find(input.expense_id)

    if (!expense) throw new NotFoundError()

    await this.repository.delete(input.expense_id)
  }
}
