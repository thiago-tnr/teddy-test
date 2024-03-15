import { MinLength } from 'class-validator'
import { ClassValidatorFields } from '../validator-protocol/class-validator-fields'
import { type User } from '../entities/user.entity'

export class UserRules {
  @MinLength(3)
    name!: string

  constructor ({ name }: User) {
    Object.assign(this, { name })
  }
}

// Refactor - strong connection class, needs to be an abstraction
export class UserValidator extends ClassValidatorFields<UserRules> {
  validate (entity: User): boolean {
    return super.validate(new UserRules(entity))
  }
}

export class UserValidatorFactory {
  static create (): UserValidator {
    return new UserValidator()
  }
}
