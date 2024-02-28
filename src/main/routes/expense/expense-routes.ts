import { Router, type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { CreateExpenseController, FindExpenseController, UpdateExpenseController, DeleteExpenseController } from '../../../application/controllers/expense'

export const expenseRoutes = Router()

expenseRoutes.post('/', async (req: Request, res: Response) => {
  const createExpenseController = container.resolve(CreateExpenseController)
  await createExpenseController.handle(req, res)
})

expenseRoutes.get('/:expense_id', async (req: Request, res: Response) => {
  const findExpenseController = container.resolve(FindExpenseController)
  await findExpenseController.handle(req, res)
})

expenseRoutes.patch('/', async (req: Request, res: Response) => {
  const updateExpenseController = container.resolve(UpdateExpenseController)
  await updateExpenseController.handle(req, res)
})

expenseRoutes.delete('/:expense_id', async (req: Request, res: Response) => {
  const deleteExpenseController = container.resolve(DeleteExpenseController)
  await deleteExpenseController.handle(req, res)
})
