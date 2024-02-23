import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, validateSync } from 'class-validator'
import { type Expense } from './expense.entity'

export class ExpenseRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
    description: string

  @IsDate()
  @IsOptional()
    data?: Date

  @IsNotEmpty()
    user: any

  @IsNumber()
  @IsNotEmpty()
    value: number

  constructor ({ description, data, user, value }: Expense) {
    Object.assign(this, { description, data, user, value })
  }
}

// Refactor - strong connection class, needs to be an abstraction
export class ExpenseValidator {
  validate (entity: Expense): void {
    validateSync(new ExpenseRules(entity))
  }
}

export class ExpenseValidatorFactory {
  static create (): ExpenseValidator {
    return new ExpenseValidator()
  }
}
