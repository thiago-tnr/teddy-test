import 'reflect-metadata'
import { Expense } from '../../../domain/entities/expense.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { FindExpenseUseCase } from '../../../application/use-case/expense'

describe('Find Expense UseCase', () => {
  let useCase: FindExpenseUseCase
  let expense: Expense
  const repositoryMock: Repository<Expense> = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn()
  }

  beforeEach(async () => {
    useCase = new FindExpenseUseCase(repositoryMock)
  })

  it('should be throw if expense not found', async () => {
    try {
      await useCase.execute({
        expense_id: 'expense_id',
        user_id: 'any'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
    }
  })

  it('should be able to find an expense', async () => {
    expense = Expense.create({
      description: 'create_any_description',
      user_owner: 'create_any_user',
      value: 123.45
    })
    await repositoryMock.create(expense)

    jest.spyOn(repositoryMock, 'find').mockImplementation(() => {
      const mockedExpense = Expense.create({
        description: 'create_any_description',
        user_owner: 'create_any_user', // Set user_owner to the user who should be able to update
        value: 123.45
      })
      return Promise.resolve(mockedExpense)
    })
    const output = await useCase.execute({
      expense_id: expense.expense_id.id,
      user_id: 'create_any_user'
    })
    expect(output.expense_id).toBeTruthy()
  })
})
