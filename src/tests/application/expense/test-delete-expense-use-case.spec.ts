import 'reflect-metadata'
import { Expense } from '../../../domain/entities/expense.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { DeleteExpenseUseCase } from '../../../application/use-case/expense'

describe('Delete Expense UseCase', () => {
  let useCase: DeleteExpenseUseCase
  let expense: Expense
  const repositoryMock: Repository<Expense> = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn()
  }

  beforeEach(async () => {
    useCase = new DeleteExpenseUseCase(repositoryMock)
  })

  it('should be throw if expense not found', async () => {
    try {
      await useCase.execute({
        expense_id: 'expense_id',
        user_id: 'any_user'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
    }
  })

  it('should be able to delete an expense', async () => {
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
    jest.spyOn(repositoryMock, 'delete')

    try {
      await useCase.execute({
        expense_id: expense.expense_id.id,
        user_id: 'create_any_user'
      })
    } catch (error) {
      expect(error).not.toThrow(NotFoundError)
    }
  })
})
