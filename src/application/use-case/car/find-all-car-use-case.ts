import { inject, injectable } from 'tsyringe'
import { type Car } from '../../../domain/entities/car.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

export type FindAllCarsInput = {
  color?: string
  brand?: string
}
// TODO updated_at is missing!
export type FindAllCarsOutPut = {
  car_id: string
  plate: string
  color: string
  brand: string
}
@injectable()
export class FindAllCarsUseCase implements UseCase<FindAllCarsInput, FindAllCarsOutPut[]> {
  constructor (
    @inject('CarRepository')
    private readonly repository: Repository<Car>
  ) { }

  async execute (input: FindAllCarsInput): Promise<FindAllCarsOutPut[]> {
    const cars = await this.repository.findAll()

    if (!cars) throw new NotFoundError()

    let filteredCars = cars
    if (input.color) {
      filteredCars = filteredCars.filter(car => car.color === input.color)
    }
    if (input.brand) {
      filteredCars = filteredCars.filter(car => car.brand === input.brand)
    }

    return filteredCars.map(car => ({
      car_id: car.car_id.id,
      plate: car.plate,
      color: car.color,
      brand: car.brand
    }))
  }
}
