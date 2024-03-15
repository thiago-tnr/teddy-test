import { Entity } from '../../shared/domain/protocol/entity-interface'
import { type ValueObject } from '../../shared/domain/value-object'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { EntityValidationError } from '../../shared/erros/validate-entity-error.er'

export type CreateCarUsageProps = {
  startDate: Date
  driver: string
  car: string
  reason: string
}

export type CarUsageProps = {
  carUsageId?: Uuid
  startDate: Date
  endDate?: Date
  driver: string
  car: string
  reason: string
}

export class CarUsage extends Entity {
  carUsageId: Uuid
  startDate: Date
  endDate?: Date
  driver: string
  car: string
  reason: string

  constructor (props: CarUsageProps) {
    super()
    this.carUsageId = props.carUsageId ?? Uuid.create()
    this.startDate = props.startDate ?? new Date()
    this.endDate = props.endDate
    this.driver = props.driver
    this.car = props.car
    this.reason = props.reason
  }

  get entity_id (): ValueObject {
    return this.carUsageId
  }

  // Método para finalizar a utilização do carro
  endUsage (endDate: Date): void {
    this.endDate = endDate
  }

  // Método para verificar se a utilização do carro está ativa
  isUsageActive (): boolean {
    return !this.endDate && !!this.driver
  }

  inDrive (): boolean {
    return !!this.driver
  }

  static create (props: CreateCarUsageProps): CarUsage {
    const car = new CarUsage(props)
    CarUsage.validate(car)
    return car
  }

  // Método para validar a entidade CarUsage
  static validate (entity: CarUsage): void {
    if (!entity.startDate || !entity.driver || !entity.car || !entity.reason) {
      throw new EntityValidationError('CarUsage validation failed: Missing required fields.')
    }
  }
}
