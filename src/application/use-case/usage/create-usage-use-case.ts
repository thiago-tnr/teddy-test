import { inject, injectable } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { CarUsage } from '../../../domain/entities/car-usage.entity'
import { UsageError } from '../../../shared/erros/usage-error.er'

export type CreateCarUsageInput = {
  startDate: Date
  driver: string
  car: string
  reason: string
}

export type CreateCarUsageOutPut = {
  carUsageId: string
  startDate: Date
  driver: string
  car: string
  reason: string
}
@injectable()
export class CreateCarUsageUseCase implements UseCase<CreateCarUsageInput, CreateCarUsageOutPut> {
  constructor (
    @inject('CarUsageRepository')
    private readonly repository: Repository<CarUsage>
  ) { }

  async execute (input: CreateCarUsageInput): Promise<CreateCarUsageOutPut> {
    const carInUse = await this.repository.findBy(input)
    console.log(carInUse)
    if (carInUse) {
      // Verifica se o carro está em uso por outro motorista e se o endDate não é null
      if (carInUse.car && carInUse.endDate === null) {
        throw new UsageError(`Car ${input.car} is already in use by another driver`)
      }

      // Verifica se o motorista está usando outro carro e se o endDate é null
      if (carInUse.driver && carInUse.endDate === null) {
        throw new UsageError(`Driver ${input.driver} is already using another car`)
      }
    }

    input.startDate = JSON.parse(JSON.stringify(new Date(input.startDate)))
    const carUsage = CarUsage.create(input)

    await this.repository.create(carUsage)

    return {
      carUsageId: carUsage.carUsageId.id,
      startDate: carUsage.startDate,
      driver: carUsage.driver,
      car: carUsage.car,
      reason: carUsage.reason
    }
  }
}
