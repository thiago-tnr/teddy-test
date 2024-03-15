import { CarRepository } from '../../../infra/prisma-db/prisma-car-repository'
import { PrismaClient } from '@prisma/client'
import { container } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type Car } from '../../../domain/entities/car.entity'
import { type User } from '../../../domain/entities/user.entity'
import { UserRepository } from '../../../infra/prisma-db/prisma-user-respository'
import { type CarUsage } from '../../../domain/entities/car-usage.entity'
import { CarUsageRepository } from '../../../infra/prisma-db/prisma-usage-repository'

// ... outros imports
export const prisma: PrismaClient = new PrismaClient({
  errorFormat: 'minimal'
})
container.register<PrismaClient>('PrismaClient', {
  useFactory: () => new PrismaClient({ errorFormat: 'minimal' })
})
container.register<Repository<Car>>('CarRepository', CarRepository)
container.register<Repository<User>>('UserRepository', UserRepository)
container.register<Repository<CarUsage>>('CarUsageRepository', CarUsageRepository)
