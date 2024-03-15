import { inject, injectable } from 'tsyringe'
import { Car } from '../../domain/entities/car.entity'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { NotFoundError } from '../../shared/erros/not-found-error.er'
import { type Repository } from '../protocols/repository-interface'
import { type PrismaClient } from '@prisma/client'
import { AlreadyExistsError } from '../../shared/erros/already-exists-error.er copy'
// TODO MAKE TESTS
@injectable()
export class CarRepository implements Repository<Car> {
  constructor (
    @inject('PrismaClient')
    private readonly prisma: PrismaClient
  ) { }

  async create (entity: Car): Promise<void> {
    const alreadyExists = await this.prisma.car.findFirst({
      where: {
        plate: entity.plate
      }
    })

    if (alreadyExists) throw new AlreadyExistsError(`Plate :${entity.plate} already exists`)

    await this.prisma.car.create({
      data: {
        car_id: entity.car_id.id,
        plate: entity.plate,
        color: entity.color,
        brand: entity.brand
      }
    })
  }

  async update (entity: Car): Promise<void> {
    const data = await this.prisma.car.findFirst({
      where: {
        car_id: entity.car_id.id
      }
    })

    if (!data) throw new NotFoundError()

    await this.prisma.car.update({
      where: { car_id: entity.car_id.id },
      data: {
        car_id: entity.car_id.id,
        plate: entity.plate,
        color: entity.color,
        brand: entity.brand
      }
    })
  }

  async find (entity_id: string): Promise<Car | null> {
    const data = await this.prisma.car.findFirst({
      where: {
        plate: entity_id
      }
    })

    if (!data) return null

    return new Car({
      car_id: Uuid.create(data.car_id as string),
      plate: data.plate,
      color: data.color,
      brand: data.brand
    })
  }

  async delete (entity_id: string): Promise<void> {
    const data = await this.prisma.car.findFirst({
      where: {
        car_id: entity_id
      }
    })

    if (!data) throw new NotFoundError()

    await this.prisma.car.delete({
      where: {
        car_id: entity_id
      }
    })
  }

  async findAll (): Promise<Car[] | null> {
    // Consultar o banco de dados
    const cars = await this.prisma.car.findMany()

    // Verificar se há carros encontrados
    if (cars.length === 0) {
      return null
    }

    // Mapear os carros retornados para o modelo de carro e retornar
    return cars.map(car => new Car({
      car_id: Uuid.create(car.car_id as string),
      plate: car.plate,
      color: car.color,
      brand: car.brand
    }))
  }

  findBy (): Promise<Car | null> {
    throw new Error('Method Not Implemented')
  }
}
