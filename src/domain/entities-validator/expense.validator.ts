import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber } from 'class-validator'
import { type Expense } from '../entities/expense.entity'
import { ClassValidatorFields } from '../validator-protocol/class-validator-fields'

export class ExpenseRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
    description: string

  @IsDate()
  @IsOptional()
    data?: Date

  @IsNotEmpty()
    user: string

  @IsNumber()
  @IsNotEmpty()
    value: number

  constructor ({ description, data, user, value }: Expense) {
    Object.assign(this, { description, data, user, value })
  }
}

// Refactor - strong connection class, needs to be an abstraction
export class ExpenseValidator extends ClassValidatorFields<ExpenseRules> {
  validate (entity: Expense): boolean {
    return super.validate(new ExpenseRules(entity))
  }
}

export class ExpenseValidatorFactory {
  static create (): ExpenseValidator {
    return new ExpenseValidator()
  }
}
