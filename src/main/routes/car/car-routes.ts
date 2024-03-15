import { Router, type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { CreateCarController, FindCarController, UpdateCarController, DeleteCarController } from '../../../application/controllers/car'
import { FindAllCarsController } from '../../../application/controllers/car/find-all-car-controller'

export const carRoutes = Router()

carRoutes.post('/', async (req: Request, res: Response) => {
  const createCarController = container.resolve(CreateCarController)
  await createCarController.handle(req, res)
})

carRoutes.get('/:car_id', async (req: Request, res: Response) => {
  const findCarController = container.resolve(FindCarController)
  await findCarController.handle(req, res)
})

carRoutes.get('/', async (req: Request, res: Response) => {
  const findAllCarsController = container.resolve(FindAllCarsController)
  await findAllCarsController.handle(req, res)
})

carRoutes.patch('/', async (req: Request, res: Response) => {
  const updateCarController = container.resolve(UpdateCarController)
  await updateCarController.handle(req, res)
})

carRoutes.delete('/:car_id', async (req: Request, res: Response) => {
  const deleteCarController = container.resolve(DeleteCarController)
  await deleteCarController.handle(req, res)
})
