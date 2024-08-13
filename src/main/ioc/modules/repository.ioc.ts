import { PrismaClient } from '@prisma/client'
import { container } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type User } from '../../../domain/entities/user.entity'
import { UserRepository } from '../../../infra/prisma-db/prisma-user-respository'
import { type ShortUrl } from '../../../domain/entities/url.entity'
import { ShortUrlRepository } from '../../../infra/prisma-db/prisma-short-url-repository'

// ... outros imports
export const prisma: PrismaClient = new PrismaClient({
  errorFormat: 'minimal'
})
container.register<PrismaClient>('PrismaClient', {
  useFactory: () => new PrismaClient({ errorFormat: 'minimal' })
})
container.register<Repository<ShortUrl>>('ShortUrlRepository', ShortUrlRepository)
container.register<Repository<User>>('UserRepository', UserRepository)
