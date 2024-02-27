import { Router } from 'express'
import { expenseRoutes } from './expense/expense-routes'

export const applicationRoutes = Router()
// Expense routes
applicationRoutes.use('/expense', expenseRoutes)
