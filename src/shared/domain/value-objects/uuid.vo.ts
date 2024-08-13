import { InvalidUuidError } from '../../erros/invalid-uuid-error.er'
import { ValueObject } from '../value-object'
import { v4 as uuid, validate as uuidValidate } from 'uuid'

export class Uuid extends ValueObject {
  readonly id: string
  constructor (id?: string) {
    super()
    this.id = id ?? uuid()
    this.validate()
  }

  private validate (): void {
    const isValid = uuidValidate(this.id)

    if (!isValid) {
      throw new InvalidUuidError()
    }
  }

  static create (id?: string): Uuid {
    return new Uuid(id)
  }
}
