import { Router, type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { ShortUrlController } from '../../../application/controllers/shorted/create-short-url-controller'
import { GetUrlController } from '../../../application/controllers/shorted/get-short-url.controller'

export const shortUrl = Router()

shortUrl.post('/', async (req: Request, res: Response) => {
  const shortUrlController = container.resolve(ShortUrlController)
  await shortUrlController.handle(req, res)
})

shortUrl.get('/:shortUrl', async (req: Request, res: Response) => {
  const getUrlController = container.resolve(GetUrlController)
  await getUrlController.handle(req, res)
})
