import { type PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import { User } from '../../domain/entities/user.entity'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { AlreadyExistsError } from '../../shared/erros/already-exists-error.er copy'
import { NotFoundError } from '../../shared/erros/not-found-error.er'
import { type Repository } from '../protocols/repository-interface'
@injectable()
export class UserRepository implements Repository<User> {
  constructor (
    @inject('PrismaClient')
    private readonly prisma: PrismaClient
  ) { }

  async create (entity: User): Promise<void> {
    const data = await this.prisma.user.findFirst({
      where: {
        name: entity.name
      }
    })

    if (data) throw new AlreadyExistsError(`This user name: ${data.name} already exists`)

    await this.prisma.user.create({
      data: {
        user_id: entity.user_id.id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
        created_at: new Date()
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
        name: entity.name
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
    const data = await this.prisma.user.findUnique({
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

  async findAll (): Promise<User[] | null> {
    const users = await this.prisma.user.findMany()

    if (users.length === 0) {
      return null
    }

    return users.map(user => new User({
      user_id: Uuid.create(user.user_id as string),
      name: user.name,
      email: user.email,
      password: user.password
    }))
  }
}
