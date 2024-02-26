import { DeleteExpenseUseCase } from '../../../application/expense/delete-expense-use-case'
import { Expense } from '../../../domain/entities/expense.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

describe('Delete Expense UseCase', () => {
  let useCase: DeleteExpenseUseCase
  let expense: Expense
  const repositoryMock: Repository<Expense> = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    useCase = new DeleteExpenseUseCase(repositoryMock)
  })

  it('should be throw if expense not found', async () => {
    try {
      await useCase.execute({
        expense_id: 'expense_id'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
    }
  })

  it('should be able to update an expense', async () => {
    expense = Expense.create({
      description: 'create_any_description',
      user_owner: 'create_any_user',
      value: 123.45
    })
    await repositoryMock.create(expense)

    jest.spyOn(repositoryMock, 'find').mockImplementation(() => Promise.resolve(expense))
    jest.spyOn(repositoryMock, 'delete')

    try {
      await useCase.execute({
        expense_id: expense.expense_id.id
      })
    } catch (error) {
      expect(error).not.toThrow(NotFoundError)
    }
  })
})
