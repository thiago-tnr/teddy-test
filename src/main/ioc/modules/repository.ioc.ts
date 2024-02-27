import { ExpenseRepository } from '../../../infra/prisma-db/prisma-expense-repository'
import { PrismaClient } from '@prisma/client'
import { container } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type Expense } from '../../../domain/entities/expense.entity'

// ... outros imports
export const prisma: PrismaClient = new PrismaClient({
  errorFormat: 'minimal'
})
container.register<PrismaClient>('PrismaClient', {
  useFactory: () => new PrismaClient({ errorFormat: 'minimal' })
})
container.register<Repository<Expense>>('ExpenseRepository', ExpenseRepository)
