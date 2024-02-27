import { Router, type Request, type Response } from 'express'
import { CreateExpenseController } from '../../../application/expense/controllers/create-expense-controller'
import { FindExpenseController } from '../../../application/expense/controllers/find-expense-controller'
import { UpdateExpenseController } from '../../../application/expense/controllers/update-expense-controller'
import { DeleteExpenseController } from '../../../application/expense/controllers/delete-expense-controller'
import { container } from 'tsyringe'

export const expenseRoutes = Router()

expenseRoutes.post('/', async (req: Request, res: Response) => {
  const createExpenseController = container.resolve(CreateExpenseController)
  await createExpenseController.handle(req, res)
})

expenseRoutes.get('/:expense_id', async (req: Request, res: Response) => {
  const findExpenseController = container.resolve(FindExpenseController)
  await findExpenseController.handle(req, res)
})

expenseRoutes.patch('/:expense_id', async (req: Request, res: Response) => {
  const updateExpenseController = container.resolve(UpdateExpenseController)
  await updateExpenseController.handle(req, res)
})

expenseRoutes.delete('/:expense_id', async (req: Request, res: Response) => {
  const deleteExpenseController = container.resolve(DeleteExpenseController)
  await deleteExpenseController.handle(req, res)
})
