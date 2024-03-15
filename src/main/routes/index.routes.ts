import { Router } from 'express'
import { carRoutes } from './car/car-routes'
import { userRoutes } from './user/user.routes'
import { carUsageRoutes } from './carUsage/car-usage.routes'

export const applicationRoutes = Router()
// car routes
applicationRoutes.use('/user', userRoutes)
applicationRoutes.use('/car', carRoutes)
applicationRoutes.use('/usage', carUsageRoutes)
