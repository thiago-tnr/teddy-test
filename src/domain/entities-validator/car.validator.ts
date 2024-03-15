import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { type Car } from '../entities/car.entity'
import { ClassValidatorFields } from '../validator-protocol/class-validator-fields'

export class CarRules {
  @MaxLength(7)
  @MinLength(7)
  @IsNotEmpty()
    plate!: string

  @IsNotEmpty()
    color!: string

  @IsString()
  @IsNotEmpty()
    brand!: string

  constructor ({ plate, color, brand }: Car) {
    Object.assign(this, { plate, color, brand })
  }
}

// Refactor - strong connection class, needs to be an abstraction
export class CarValidator extends ClassValidatorFields<CarRules> {
  validate (entity: Car): boolean {
    return super.validate(new CarRules(entity))
  }
}

export class CarValidatorFactory {
  static create (): CarValidator {
    return new CarValidator()
  }
}
