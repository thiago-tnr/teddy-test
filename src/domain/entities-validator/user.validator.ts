import { IsString, IsEmail } from 'class-validator'
import { ClassValidatorFields } from '../validator-protocol/class-validator-fields'
import { type User } from '../entities/user.entity'

export class UserRules {
  @IsString()
    name!: string

  @IsEmail()
    email!: string

  @IsString()
    password!: string

  constructor ({ name, email, password }: User) {
    Object.assign(this, { name, email, password })
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
