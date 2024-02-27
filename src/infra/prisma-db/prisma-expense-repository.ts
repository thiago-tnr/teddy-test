import { inject, injectable } from 'tsyringe'
import { Expense } from '../../domain/entities/expense.entity'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { NotFoundError } from '../../shared/erros/not-found-error.er'
import { type Repository } from '../protocols/repository-interface'
import { type PrismaClient } from '@prisma/client'
// TODO MAKE TESTS
@injectable()
export class ExpenseRepository implements Repository<Expense> {
  constructor (
    @inject('PrismaClient')
    private readonly prisma: PrismaClient
  ) { }

  async create (entity: Expense): Promise<void> {
    await this.prisma.expense.create({
      data: {
        expense_id: entity.expense_id.id,
        description: entity.description,
        data: entity.data,
        value: entity.value,
        user_owner: entity.user_owner
      }
    })
  }

  async update (entity: Expense): Promise<void> {
    const data = await this.prisma.expense.findFirst({
      where: {
        expense_id: entity.expense_id.id
      }
    })

    if (!data) throw new NotFoundError()

    await this.prisma.expense.update({
      where: { expense_id: entity.expense_id.id },
      data: {
        expense_id: entity.expense_id.id,
        description: entity.description,
        data: entity.data,
        value: entity.value,
        user_owner: entity.user_owner
      }
    })
  }

  async find (entity_id: string): Promise<Expense | null> {
    const data = await this.prisma.expense.findFirst({
      where: {
        expense_id: entity_id
      }
    })

    if (!data) return null

    return new Expense({
      expense_id: Uuid.create(data.expense_id),
      description: data.description!,
      data: data.data,
      value: data.value,
      user_owner: data.user_owner
    })
  }

  async delete (entity_id: string): Promise<void> {
    const data = await this.prisma.expense.findFirst({
      where: {
        expense_id: entity_id
      }
    })

    if (!data) throw new NotFoundError()

    await this.prisma.expense.delete({
      where: {
        expense_id: entity_id
      }
    })
  }
}
