import { Entity } from '../../shared/domain/protocol/entity-interface'
import { type ValueObject } from '../../shared/domain/value-object'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { type UserValidator, UserValidatorFactory } from '../entities-validator/user.validator'
import { EntityValidationError } from '../../shared/erros/validate-entity-error.er'
// TODO -
export type UserProps = {
  user_id?: Uuid
  name: string
}

export type CreateUserProps = {
  name: string
}

export class User extends Entity {
  user_id: Uuid
  name: string

  constructor (input: UserProps) {
    super()
    this.user_id = input.user_id ?? Uuid.create()
    this.name = input.name
  }

  get entity_id (): ValueObject {
    throw new Error('Method not implemented.')
  }

  static create (props: CreateUserProps): User {
    const user = new User(props)
    User.validate(user)
    return user
  }

  changeName (name: string): void {
    this.name = name
    User.validate(this)
  }

  static validate (entity: User): UserValidator {
    let returnValidator
    try {
      const validator = UserValidatorFactory.create()
      const isValid = validator.validate(entity)
      if (!isValid) {
        throw new EntityValidationError()
      }

      returnValidator = validator
    } catch (error) {
      throw new EntityValidationError('Cannot create this user')
    }

    return returnValidator!
  }
}
