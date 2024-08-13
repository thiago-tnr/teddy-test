import { Router, type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { FindAllUrlController } from '../../../application/controllers/shorted/find-all-short-url.controller'
import { verifyToken } from '../../../middleware/middleware'
import { UpdateUrlController } from '../../../application/controllers/shorted/update-short-url.controller'
import { DeleteShortUrlController } from '../../../application/controllers/shorted/delete-user-controller'

export const authShortUrl = Router()

authShortUrl.get('/allUrls', verifyToken, async (req: Request, res: Response) => {
  const findAllUrlController = container.resolve(FindAllUrlController)
  await findAllUrlController.handle(req, res)
})

authShortUrl.put('/updateUrl', verifyToken, async (req: Request, res: Response) => {
  const updateUrlController = container.resolve(UpdateUrlController)
  await updateUrlController.handle(req, res)
})

authShortUrl.delete('/deleteUrl', verifyToken, async (req: Request, res: Response) => {
  const deleteShortUrlController = container.resolve(DeleteShortUrlController)
  await deleteShortUrlController.handle(req, res)
})
