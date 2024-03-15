import { type PrismaClient } from '@prisma/client'
import { User } from '../../domain/entities/user.entity'
import { type Repository } from '../protocols/repository-interface'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { NotFoundError } from '../../shared/erros/not-found-error.er'
import { inject, injectable } from 'tsyringe'
import { AlreadyExistsError } from '../../shared/erros/already-exists-error.er copy'
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
        name: entity.name
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
      name: data.name!
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

  findBy (): Promise<User | null> {
    throw new Error('Method Not Implemented')
  }

  async findAll (): Promise<User[] | null> {
    // Consultar o banco de dados
    const users = await this.prisma.user.findMany()

    // Verificar se há carros encontrados
    if (users.length === 0) {
      return null
    }

    // Mapear os carros retornados para o modelo de carro e retornar
    return users.map(user => new User({
      user_id: Uuid.create(user.user_id as string),
      name: user.name
    }))
  }
}
