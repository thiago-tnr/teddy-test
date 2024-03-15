import { inject, injectable } from 'tsyringe'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { type Repository } from '../protocols/repository-interface'
import { type PrismaClient } from '@prisma/client'
import { CarUsage } from '../../domain/entities/car-usage.entity'
import { UsageError } from '../../shared/erros/usage-error.er'

export type CreateCarUsageInput = {
  driver: string
  car: string
}

// TODO MAKE TESTS
@injectable()
export class CarUsageRepository implements Repository<CarUsage> {
  constructor (
    @inject('PrismaClient')
    private readonly prisma: PrismaClient
  ) { }

  async create (entity: CarUsage): Promise<void> {
    await this.prisma.carUsage.create({
      data: {
        car_usage_id: entity.carUsageId.id,
        startDate: entity.startDate,
        driver: entity.driver,
        car: entity.car,
        reason: entity.reason
      }
    })
  }

  async update (entity: CarUsage): Promise<void> {
    console.log('entrou')

    await this.prisma.carUsage.update({
      where: { car_usage_id: entity.carUsageId.id },
      data: {
        car_usage_id: entity.carUsageId.id,
        endDate: entity.endDate!,
        startDate: entity.startDate,
        driver: entity.driver,
        car: entity.car,
        reason: entity.reason
      }
    })
  }

  async find (entity_id: string): Promise<CarUsage | null> {
    console.log(entity_id)
    const data = await this.prisma.carUsage.findFirst({
      where: {
        driver: entity_id
      }
    })

    if (!data) return null

    return new CarUsage({
      carUsageId: Uuid.create(data.car_usage_id),
      endDate: data.endDate!,
      startDate: data.startDate,
      driver: data.driver,
      car: data.car,
      reason: data.reason
    })
  }

  async findAll (): Promise<CarUsage[] | null> {
    const data = await this.prisma.carUsage.findMany()

    if (!data) return null

    const carUsages: CarUsage[] = data.map((item: any) => {
      return new CarUsage({
        carUsageId: Uuid.create(item.car_usage_id as string),
        endDate: item.endDate!,
        startDate: item.startDate,
        driver: item.driver,
        car: item.car,
        reason: item.reason
      })
    })
    return carUsages
  }

  async delete (entity_id: string): Promise<void> { }

  async findBy (input: CreateCarUsageInput): Promise<CarUsage | null> {
    const data = await this.prisma.carUsage.findMany({
      where: {
        OR: [
          { driver: input.driver },
          { car: input.car }
        ]
      }
    })

    if (data.length === 0) {
      return null
    }

    // Variáveis para verificar se o motorista ou o carro estão sendo usados em outro lugar
    let driverIsUsingAnotherCar = false
    let carIsBeingUsedByAnotherDriver = false

    // Iterar sobre cada uso encontrado
    for (const usage of data) {
      // Verificar se o uso corresponde aos dados fornecidos
      if (usage.driver === input.driver && usage.car === input.car && !usage.endDate) {
        // Se a correspondência for encontrada e o endDate for null, retornar o CarUsage
        return new CarUsage({
          carUsageId: Uuid.create(usage.car_usage_id), // Seu código para criar um novo Uuid
          endDate: usage.endDate!,
          startDate: usage.startDate,
          driver: usage.driver,
          car: usage.car,
          reason: usage.reason
        })
      }

      // Verificar se o motorista está usando outro carro
      if (usage.driver === input.driver && usage.car !== input.car && !usage.endDate) {
        driverIsUsingAnotherCar = true
      }

      // Verificar se o carro está sendo usado por outro motorista
      if (usage.car === input.car && usage.driver !== input.driver && !usage.endDate) {
        carIsBeingUsedByAnotherDriver = true
      }
    }

    // Se o motorista já estiver usando outro carro, retornar um erro
    if (driverIsUsingAnotherCar) {
      throw new UsageError(`Driver ${input.driver} is already using another car`)
    }

    // Se o carro estiver sendo usado por outro motorista, retornar um erro
    if (carIsBeingUsedByAnotherDriver) {
      throw new UsageError(`Car ${input.car} is already being used by another driver`)
    }

    return null // Nenhum uso correspondente encontrado
  }
}
