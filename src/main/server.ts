import 'express-async-errors'
import 'reflect-metadata'

import express, { type NextFunction, type Request, type Response } from 'express'
import { errorValidate } from '../shared/helper/error-validate'
import './ioc/modules/index'
import { applicationRoutes } from './routes/index.routes'
const app = express()

app.use(express.json())
app.use(applicationRoutes)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  errorValidate(err, request, response, next)
})

app.listen(3000, () => {
  console.log(
    'Server is running'
  )
})
