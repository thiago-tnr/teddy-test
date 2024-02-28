import { type PrismaClient } from '@prisma/client'
import { User } from '../../domain/entities/user.entity'
import { type Repository } from '../protocols/repository-interface'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { NotFoundError } from '../../shared/erros/not-found-error.er'
import { inject, injectable } from 'tsyringe'
@injectable()
export class UserRepository implements Repository<User> {
  constructor (
    @inject('PrismaClient')
    private readonly prisma: PrismaClient
  ) { }

  async create (entity: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        user_id: entity.user_id.id,
        name: entity.name,
        email: entity.email,
        password: entity.password
      }
    })
  }

  async update (entity: User): Promise<void> {
    const data = await this.prisma.user.findFirst({
      where: {
        user_id: entity.user_id.id
      }
    })

    if (!data) throw new NotFoundError()

    await this.prisma.user.update({
      where: { user_id: entity.user_id.id },
      data: {
        user_id: entity.user_id.id,
        name: entity.name,
        email: entity.email,
        password: entity.password
      }
    })
  }

  async find (entity_id: string): Promise<User | null> {
    const data = await this.prisma.user.findFirst({
      where: {
        user_id: entity_id
      }
    })

    if (!data) return null

    return new User({
      user_id: Uuid.create(data.user_id),
      name: data.name,
      email: data.email,
      password: data.password
    })
  }

  async delete (entity_id: string): Promise<void> {
    const data = await this.prisma.user.findFirst({
      where: {
        user_id: entity_id
      }
    })

    if (!data) throw new NotFoundError()

    await this.prisma.user.delete({
      where: {
        user_id: entity_id
      }
    })
  }

  async findByEmail (email: string): Promise<User | null> {
    const data = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!data) return null

    return new User({
      user_id: Uuid.create(data.user_id),
      name: data.name,
      email: data.email,
      password: data.password
    })
  }
}
