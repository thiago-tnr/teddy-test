import 'reflect-metadata'
import { UpdateExpenseUseCase } from '../../../application/expense/use-case/update-expense-use-case'
import { Expense } from '../../../domain/entities/expense.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

describe('Update Expense UseCase', () => {
  let useCase: UpdateExpenseUseCase
  let expense: Expense
  const repositoryMock: Repository<Expense> = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    delete: jest.fn()
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

    jest.spyOn(repositoryMock, 'find').mockImplementation(() => Promise.resolve(expense))
    const spy = jest.spyOn(repositoryMock, 'update')

    const output = await useCase.execute({
      expense_id: expense.expense_id.id,
      description: 'new description'
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(output.description).toBe('new description')
  })
})
