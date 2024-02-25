import { Expense } from '../../domain/entities/expense.entity'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { EntityValidationError } from '../../shared/erros/validate-entity-error.er'

describe('Expense Unit Tests', () => {
  let validateSpy: any
  beforeEach(() => {
    validateSpy = jest.spyOn(Expense, 'validate')
  })

  describe('Expense validator', () => {
    it('constructor', () => {
      const expense = new Expense({
        description: 'any_description',
        user_owner: 'any_user',
        value: 123.45
      })

      expect(expense.expense_id).toBeInstanceOf(Uuid)
      expect(expense.description).toBe('any_description')
      expect(expense.data).toBeInstanceOf(Date)
    })

    it('should be create a category', () => {
      const expense = Expense.create({
        description: 'create_any_description',
        user_owner: 'create_any_user',
        value: 123.45
      })

      expect(expense.expense_id).toBeInstanceOf(Uuid)
      expect(expense.description).toBe('create_any_description')
      expect(expense.data).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    it('should be update a description', () => {
      const expense = Expense.create({
        description: 'create_any_description',
        user_owner: 'create_any_user',
        value: 123.45
      })

      expense.changeDescription('update_any_description')
      expect(expense.description).toBe('update_any_description')
      expect(validateSpy).toHaveBeenCalledTimes(2)
    })
    it('should be update a value', () => {
      const expense = Expense.create({
        description: 'create_any_description',
        user_owner: 'create_any_user',
        value: 123.45
      })

      expense.changeValue(543.21)
      expect(expense.value).toBe(543.21)
      expect(validateSpy).toHaveBeenCalledTimes(2)
    })

    it('create command', () => {
      try {
        Expense.create({
          description: undefined,
          user: null,
          value: '123.45'
        })
      } catch (error) {
        expect(error).toBeInstanceOf(EntityValidationError)
      }
    })
  })
})
