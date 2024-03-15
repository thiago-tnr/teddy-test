import { inject, injectable } from 'tsyringe'
import { type Car } from '../../../domain/entities/car.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

export type DeleteCarInput = {
  car_id: string
  user_id: string
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type DeleteCarOutPut = void
@injectable()
export class DeleteCarUseCase implements UseCase<DeleteCarInput, DeleteCarOutPut> {
  constructor (
    @inject('CarRepository')
    private readonly repository: Repository<Car>
  ) { }

  async execute (input: DeleteCarInput): Promise<DeleteCarOutPut> {
    const car = await this.repository.find(input.car_id)

    if (!car) throw new NotFoundError()

    await this.repository.delete(input.car_id)
  }
}
