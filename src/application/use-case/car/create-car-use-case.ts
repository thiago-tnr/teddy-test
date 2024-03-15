import { inject, injectable } from 'tsyringe'
import { Car } from '../../../domain/entities/car.entity'
import { Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'

export type CreateCarInput = {
  plate: string
  color: string
  brand: string
}
export type CreateCarOutPut = {
  car_id: string
  plate: string
  color: string
  brand: string
}
@injectable()
export class CreateCarUseCase implements UseCase<CreateCarInput, CreateCarOutPut> {
  constructor (
    @inject('CarRepository')
    private readonly repository: Repository<Car>
  ) { }

  async execute (input: CreateCarInput): Promise<CreateCarOutPut> {
    if (!input) {
      throw new Error()
    }
    const car = Car.create(input)
    await this.repository.create(car)

    return {
      car_id: car.car_id.id,
      plate: car.plate,
      color: car.color,
      brand: car.brand
    }
  }
}
