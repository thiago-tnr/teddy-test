import { Entity } from '../../shared/domain/protocol/entity-interface'
import { type ValueObject } from '../../shared/domain/value-object'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { type UserValidator, UserValidatorFactory } from '../entities-validator/user.validator'
import { EntityValidationError } from '../../shared/erros/validate-entity-error.er'
// TODO -
export type UserProps = {
  user_id?: Uuid
  name: string
  email: string
  password: string
}

export type CreateUserProps = {
  name: string
  email: string
  password: string
}

export class User extends Entity {
  user_id: Uuid
  name: string
  email: string
  password: string
  constructor (input: UserProps) {
    super()
    this.user_id = input.user_id ?? Uuid.create()
    this.name = input.name
    this.email = input.email
    this.password = input.password
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

  changeEmail (email: string): void {
    this.email = email
    User.validate(this)
  }

  changePassword (password: string): void {
    this.password = password
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
      console.log('User validation error')
    }

    return returnValidator!
  }
}
