import { Entity } from '../../shared/domain/protocol/entity-interface'
import { type ValueObject } from '../../shared/domain/value-object'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { EntityValidationError } from '../../shared/erros/validate-entity-error.er'
import { type ExpenseValidator, ExpenseValidatorFactory } from '../entities-validator/expense.validator'

export type ExpenseProps = {
  expense_id?: Uuid
  description: string
  data?: Date | string
  user_owner: any
  value: number
}

export type CreateExpenseProps = {
  description: string
  user_owner: any
  value: number
}

export class Expense extends Entity {
  expense_id: Uuid
  description: string
  data: Date | string
  user_owner: any
  value: number

  constructor (props: ExpenseProps) {
    super()
    this.expense_id = props.expense_id ?? Uuid.create()
    this.description = props.description
    this.data = props.data ?? new Date()
    this.user_owner = props.user_owner
    this.value = props.value
  }

  get entity_id (): ValueObject {
    return this.expense_id
  }

  // factory method to create a new Expense
  static create (props: CreateExpenseProps): Expense {
    const expense = new Expense(props)
    Expense.validate(expense)
    return expense
  }

  changeDescription (description: string): void {
    this.description = description
    Expense.validate(this)
  }

  changeValue (value: number): void {
    this.value = value
    Expense.validate(this)
  }

  static validate (entity: Expense): ExpenseValidator {
    let returnValidator
    try {
      const validator = ExpenseValidatorFactory.create()
      const isValid = validator.validate(entity)
      if (!isValid) {
        throw new EntityValidationError()
      }

      returnValidator = validator
    } catch (error) {
    }

    return returnValidator!
  }
}
