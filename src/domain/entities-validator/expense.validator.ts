import { IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber } from 'class-validator'
import { type Expense } from '../entities/expense.entity'
import { ClassValidatorFields } from '../validator-protocol/class-validator-fields'

export class ExpenseRules {
  @MaxLength(195)
  @IsString()
  @IsNotEmpty()
    description!: string

  @IsString()
  @IsOptional()
    data?: Date | string

  @IsNotEmpty()
    user_owner!: string

  @IsNumber()
  @IsNotEmpty()
    value!: number

  constructor ({ description, data, user_owner, value }: Expense) {
    Object.assign(this, { description, data, user_owner, value })
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
