import { Expense } from '../../domain/expense.entity'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'

describe('Expense Unit Tests', () => {
  it('constructor', () => {
    const expense = new Expense({
      description: 'any_description',
      user: 'any_user',
      value: 123.45
    })

    expect(expense.expense_id).toBeInstanceOf(Uuid)
    expect(expense.description).toBe('any_description')
    expect(expense.data).toBeInstanceOf(Date)
  })

  it('should be create a category', () => {
    const expense = Expense.create({
      description: 'create_any_description',
      user: 'create_any_user',
      value: 123.45
    })

    expect(expense.expense_id).toBeInstanceOf(Uuid)
    expect(expense.description).toBe('create_any_description')
    expect(expense.data).toBeInstanceOf(Date)
  })
  it('should be update a description', () => {
    const expense = Expense.create({
      description: 'create_any_description',
      user: 'create_any_user',
      value: 123.45
    })

    expense.changeDescription('update_any_description')
    expect(expense.description).toBe('update_any_description')
  })
  it('should be update a value', () => {
    const expense = Expense.create({
      description: 'create_any_description',
      user: 'create_any_user',
      value: 123.45
    })

    expense.changeValue(543.21)
    expect(expense.value).toBe(543.21)
  })
})
