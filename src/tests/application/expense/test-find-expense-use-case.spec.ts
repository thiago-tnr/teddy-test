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
    delete: jest.fn()
  }

  beforeEach(async () => {
    useCase = new FindExpenseUseCase(repositoryMock)
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
    const output = await useCase.execute({
      expense_id: expense.expense_id.id
    })
    expect(output.expense_id).toEqual(expense.expense_id.id)
  })
})
