import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { ExpenseValidatorFactory } from './expense.validator'

export type ExpenseProps = {
  expense_id?: Uuid
  description: string
  data?: Date
  user: any
  value: number
}

export type CreateExpenseProps = {
  description: string
  user: any
  value: number
}

export class Expense {
  expense_id: Uuid
  description: string
  data: Date
  user: any
  value: number

  constructor (props: ExpenseProps) {
    this.expense_id = props.expense_id ?? Uuid.create()
    this.description = props.description
    this.data = props.data ?? new Date()
    this.user = props.user
    this.value = props.value
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

  static validate (entity: Expense): void {
    const validator = ExpenseValidatorFactory.create()
    validator.validate(entity)
  }
}
