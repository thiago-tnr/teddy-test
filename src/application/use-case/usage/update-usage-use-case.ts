import { inject, injectable } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { type CarUsage } from '../../../domain/entities/car-usage.entity'

export type UpdateCarUsageInput = {
  driver: string
  endDate: Date
}

export type UpdateCarUsageOutPut = {
  carUsageId: string
  startDate: Date
  endDate: Date
  driver: string
  car: string
  reason: string
}
@injectable()
export class UpdateCarUsageUseCase implements UseCase<UpdateCarUsageInput, UpdateCarUsageOutPut> {
  constructor (
    @inject('CarUsageRepository')
    private readonly repository: Repository<CarUsage>
  ) { }

  async execute (input: UpdateCarUsageInput): Promise<UpdateCarUsageOutPut> {
    const carUsage = await this.repository.find(input.driver)

    if (!carUsage) throw new NotFoundError()

    input.endDate = JSON.parse(JSON.stringify(new Date(input.endDate)))
    input.endDate && carUsage.endUsage(input.endDate)

    await this.repository.update(carUsage)

    return {
      carUsageId: carUsage.carUsageId.id,
      startDate: carUsage.startDate,
      endDate: carUsage.endDate!,
      driver: carUsage.driver,
      car: carUsage.car,
      reason: carUsage.reason
    }
  }
}
