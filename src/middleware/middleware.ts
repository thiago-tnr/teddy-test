import { type NextFunction, type Request, type Response } from 'express'
import Jwt from 'jsonwebtoken'
import { AppError } from '../shared/erros/app-error.er.ts'

export const refreshToken = (req: Request, res: Response, next: NextFunction): void => {
  const refreshToken: any = req.body.refreshToken as string
  if (refreshToken) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Jwt.verify(refreshToken, process.env.REFRESH_JWT_SEC!, (err: any, user: any) => {
      if (err) {
        throw new AppError('Invalid Token')
      } else {
        const tokenRefreshed = Jwt.sign({ name: user.name }, process.env.JWT_SEC!, { expiresIn: '60s' })
        return res.status(200).json({ message: 'Token refreshed sucessfuly', tokenRefreshed })
      }
    })
  } else {
    throw new AppError('You are not authenticated')
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader: any = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1] as string
    Jwt.verify(token, process.env.JWT_SEC!, (err: any, user: any) => {
      if (err) {
        res.status(403).json('Invalid Token')
      } else {
        req.user = user
        next()
      }
    })
  } else {
    throw new AppError('You are not authenticated')
  }
}
