import { Expense } from '../../domain/entities/expense.entity'
import { type Repository } from '../../infra/protocols/repository-interface'
import { type UseCase } from '../../shared/application/protocol/use-case-interface'
import { type Uuid } from '../../shared/domain/value-objects/uuid.vo'

export type CreateExpenseInput = {
  description: string
  user_owner: any
  value: number
}
export type CreateExpenseOutPut = {
  expense_id: Uuid
  description: string
  data: Date
  user_owner: any
  value: number
}

export class CreateExpenseUseCase implements UseCase<CreateExpenseInput, CreateExpenseOutPut> {
  constructor (
    private readonly repository: Repository<Expense>
  ) {}

  async execute (input: CreateExpenseInput): Promise<CreateExpenseOutPut> {
    const entity = Expense.create(input)

    await this.repository.create(entity)

    return {
      expense_id: entity.expense_id,
      description: entity.description,
      data: entity.data,
      user_owner: entity.user_owner,
      value: entity.value
    }
  }
}
