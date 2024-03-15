import { inject, injectable } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { type CarUsage } from '../../../domain/entities/car-usage.entity'
import { type Car } from '../../../domain/entities/car.entity'

export type CarUsed = {
  plate: string
  color: string
  brand: string
}
export type FindCarUsageOutPut = {
  carUsageId: string
  startDate: Date
  endDate: Date
  driver: string
  car: CarUsed
  reason: string
}
@injectable()
export class FindCarUsageUseCase implements UseCase<any, FindCarUsageOutPut[]> {
  constructor (
    @inject('CarUsageRepository')
    private readonly repository: Repository<CarUsage>,
    @inject('CarRepository')
    private readonly carRepository: Repository<Car>
  ) { }

  async execute (input: any): Promise<FindCarUsageOutPut[]> {
    const carUsed = await this.repository.findAll()

    const processedCarUsages = []

    for (const usage of carUsed!) {
      const carPlate = usage.car
      const carInfo = await this.carRepository.find(carPlate)

      if (carInfo) {
        const processedUsage = {
          carUsageId: usage.carUsageId.id,
          endDate: usage.endDate!,
          startDate: usage.startDate,
          driver: usage.driver,
          car: {
            plate: carInfo.plate,
            color: carInfo.color,
            brand: carInfo.brand
          },
          reason: usage.reason
        }

        processedCarUsages.push(processedUsage)
      }
    }
    return processedCarUsages
  }
}
