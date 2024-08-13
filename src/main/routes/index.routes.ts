import { Router } from 'express'
import { shortUrl } from './shortUrl/short.routes'
import { userRoutes } from './user/user.routes'
import { authShortUrl } from './shortUrl/short.auth.routes'

export const applicationRoutes = Router()

applicationRoutes.use('/user', userRoutes)
applicationRoutes.use('/', shortUrl)
applicationRoutes.use('/shortUrl', authShortUrl)
