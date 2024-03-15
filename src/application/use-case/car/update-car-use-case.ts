import { inject, injectable } from 'tsyringe'
import { type Car } from '../../../domain/entities/car.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

export type UpdateCarInput = {
  car_id: string
  plate?: string
  color?: string
  brand?: string
}
// TODO updated_at is missing!
export type UpdateCarOutPut = {
  Car_id: string
  plate?: string
  color?: string
  brand?: string
}
@injectable()
export class UpdateCarUseCase implements UseCase<UpdateCarInput, UpdateCarOutPut> {
  constructor (
    @inject('CarRepository')
    private readonly repository: Repository<Car>
  ) { }

  async execute (input: UpdateCarInput): Promise<UpdateCarOutPut> {
    const car = await this.repository.find(input.car_id)

    if (!car) throw new NotFoundError()

    input.plate && car.changePlate(input.plate)
    input.brand && car.changeBrand(input.brand)
    input.color && car.changeColor(input.color)

    await this.repository.update(car)

    return {
      Car_id: car.car_id.id,
      plate: car.plate,
      color: car.color,
      brand: car.brand
    }
  }
}
