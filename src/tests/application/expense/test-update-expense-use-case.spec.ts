import 'reflect-metadata'
import { Expense } from '../../../domain/entities/expense.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { UpdateExpenseUseCase } from '../../../application/use-case/expense'

describe('Update Expense UseCase', () => {
  let useCase: UpdateExpenseUseCase
  let expense: Expense
  const repositoryMock: Repository<Expense> = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn()
  }

  beforeEach(async () => {
    useCase = new UpdateExpenseUseCase(repositoryMock)
  })

  it('should be throw if expense not found', async () => {
    try {
      await useCase.execute({
        expense_id: 'expense_id',
        description: 'new description'
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

    jest.spyOn(repositoryMock, 'find').mockImplementation(() => {
      const mockedExpense = Expense.create({
        description: 'create_any_description',
        user_owner: 'create_any_user', // Set user_owner to the user who should be able to update
        value: 123.45
      })
      return Promise.resolve(mockedExpense)
    })
    const spy = jest.spyOn(repositoryMock, 'update')

    const output = await useCase.execute({
      expense_id: expense.expense_id.id,
      description: 'new description',
      user_id: 'create_any_user'
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(output.description).toBe('new description')
  })
})
