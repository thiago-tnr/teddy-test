import { Router, type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { verifyTokenAndAuthorization } from '../../middleware/middleware'
import { CreateUserController, DeleteUserController, FindUserController, LoginUserController, UpdateUserController } from '../../../application/controllers/user'

export const userRoutes = Router()

userRoutes.post('/login', async (req: Request, res: Response) => {
  const createUserController = container.resolve(LoginUserController)
  await createUserController.handle(req, res)
})

userRoutes.post('/', async (req: Request, res: Response) => {
  const createUserController = container.resolve(CreateUserController)
  await createUserController.handle(req, res)
})

userRoutes.get('/:user_id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
  const findUserController = container.resolve(FindUserController)
  await findUserController.handle(req, res)
})

userRoutes.patch('/', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
  const updateUserController = container.resolve(UpdateUserController)
  await updateUserController.handle(req, res)
})

userRoutes.delete('/:user_id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
  const deleteUserController = container.resolve(DeleteUserController)
  await deleteUserController.handle(req, res)
})
