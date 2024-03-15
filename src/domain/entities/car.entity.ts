import { Entity } from '../../shared/domain/protocol/entity-interface'
import { type ValueObject } from '../../shared/domain/value-object'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { EntityValidationError } from '../../shared/erros/validate-entity-error.er'
import { type CarValidator, CarValidatorFactory } from '../entities-validator/car.validator'

export type CarProps = {
  car_id?: Uuid
  plate: string
  color: string
  brand: string
}

export type CreateCarProps = {
  plate: string
  color: string
  brand: string
}

export class Car extends Entity {
  car_id: Uuid
  plate: string
  color: string
  brand: string

  constructor (props: CarProps) {
    super()
    this.car_id = props.car_id ?? Uuid.create()
    this.plate = props.plate
    this.color = props.color
    this.brand = props.brand
  }

  get entity_id (): ValueObject {
    return this.car_id
  }

  changeBrand (brand: string): void {
    this.brand = brand
    Car.validate(this)
  }

  changeColor (color: string): void {
    this.color = color
    Car.validate(this)
  }

  changePlate (plate: string): void {
    this.plate = plate
    Car.validate(this)
  }

  // factory method to create a new car
  static create (props: CreateCarProps): Car {
    const car = new Car(props)
    Car.validate(car)
    return car
  }

  static validate (entity: Car): CarValidator {
    let returnValidator
    try {
      const validator = CarValidatorFactory.create()
      const isValid = validator.validate(entity)
      if (!isValid) {
        throw new EntityValidationError()
      }

      returnValidator = validator
    } catch (error) {
      throw new EntityValidationError('Car params is invalid')
    }

    return returnValidator!
  }
}
