import { inject, injectable } from 'tsyringe'
import { type Car } from '../../../domain/entities/car.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

export type FindCarInput = {
  car_id: string
}
// TODO updated_at is missing!
export type FindCarOutPut = {
  car_id: string
  plate: string
  color: string
  brand: string
}
@injectable()
export class FindCarUseCase implements UseCase<FindCarInput, FindCarOutPut> {
  constructor (
    @inject('CarRepository')
    private readonly repository: Repository<Car>
  ) { }

  async execute (input: FindCarInput): Promise<FindCarOutPut> {
    const car = await this.repository.find(input.car_id)

    if (!car) throw new NotFoundError()

    return {
      car_id: car.car_id.id,
      plate: car.plate,
      color: car.color,
      brand: car.brand
    }
  }
}
