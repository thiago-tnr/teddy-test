import { CreateExpenseUseCase } from '../../../application/expense/use-case/create-expense-use-case'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type Expense } from '../../../domain/entities/expense.entity'
describe('Create Expense UseCase', () => {
  let useCase: CreateExpenseUseCase
  const repositoryMock: Repository<Expense> = {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(() => {
    useCase = new CreateExpenseUseCase(repositoryMock)
  })
  it('should create a category', async () => {
    const spy = jest.spyOn(repositoryMock, 'create')
    const output = await useCase.execute({
      description: 'cre',
      user_owner: 'create_any_user',
      value: 123.45
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(output).toHaveProperty('expense_id')
  })
})
