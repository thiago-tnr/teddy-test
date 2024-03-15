import { Router, type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserController, DeleteUserController, FindUserController, UpdateUserController } from '../../../application/controllers/user'
import { FindAllUserController } from '../../../application/controllers/user/find-all-user-controller'

export const userRoutes = Router()

userRoutes.post('/', async (req: Request, res: Response) => {
  const createUserController = container.resolve(CreateUserController)
  await createUserController.handle(req, res)
})

userRoutes.get('/:user_id', async (req: Request, res: Response) => {
  const findUserController = container.resolve(FindUserController)
  await findUserController.handle(req, res)
})

userRoutes.get('/', async (req: Request, res: Response) => {
  const findAllUserController = container.resolve(FindAllUserController)
  await findAllUserController.handle(req, res)
})

userRoutes.patch('/', async (req: Request, res: Response) => {
  const updateUserController = container.resolve(UpdateUserController)
  await updateUserController.handle(req, res)
})

userRoutes.delete('/:user_id', async (req: Request, res: Response) => {
  const deleteUserController = container.resolve(DeleteUserController)
  await deleteUserController.handle(req, res)
})
