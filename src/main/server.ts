import 'reflect-metadata'
import express from 'express'
import './ioc/modules/index'
import { applicationRoutes } from './routes/index.routes'

const app = express()

app.use(express.json())
app.use(applicationRoutes)
// app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
//   if (err instanceof NotFoundError) {
//     return response.status(err.statusCode).json({
//       status: 'error',
//       message: err.message
//     })
//   }

//   return response.status(500).json({
//     status: 'error',
//     message: 'Internal server error'
//   })
// })
app.listen(3000, () => {
  console.log(
    'Server is running'
  )
})
