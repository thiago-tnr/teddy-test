import { Router } from 'express'
import { expenseRoutes } from './expense/expense-routes'
import { userRoutes } from './user/user.routes'
import { verifyTokenAndAuthorization } from '../middleware/middleware'

export const applicationRoutes = Router()
// Expense routes
applicationRoutes.use('/user', userRoutes)
applicationRoutes.use('/expense', verifyTokenAndAuthorization, expenseRoutes)
