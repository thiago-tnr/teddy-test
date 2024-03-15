import { Router, type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { CreateCarUsageController, FindCarUsageController, UpdateCarUsageController } from '../../../application/controllers/usage'

export const carUsageRoutes = Router()

carUsageRoutes.post('/', async (req: Request, res: Response) => {
  const createCarUsageController = container.resolve(CreateCarUsageController)
  await createCarUsageController.handle(req, res)
})

carUsageRoutes.get('/', async (req: Request, res: Response) => {
  const findCarUsageController = container.resolve(FindCarUsageController)
  await findCarUsageController.handle(req, res)
})

carUsageRoutes.patch('/', async (req: Request, res: Response) => {
  const updateCarUsageController = container.resolve(UpdateCarUsageController)
  await updateCarUsageController.handle(req, res)
})
