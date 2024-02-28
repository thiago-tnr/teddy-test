import { type NextFunction, type Request, type Response } from 'express'
import Jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../../shared/erros/unauthorized-error.er'

// Estendendo a interface Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        is_admin: boolean
      }
    }
  }
}

export const refreshToken = (req: Request, res: Response, next: NextFunction): void => {
  const refreshToken: any = req.body.refreshToken
  if (refreshToken) {
    Jwt.verify(refreshToken as string, process.env.REFRESH_JWT_SEC!, (err: any, user: any) => {
      if (err) {
        throw new UnauthorizedError('Invalid Token')
      } else {
        const tokenRefreshed = Jwt.sign({ name: user.name }, process.env.JWT_SECRET_KEY!, { expiresIn: '60s' })
        return res.status(200).json({ message: 'Token refreshed successfully', tokenRefreshed })
      }
    })
  } else {
    throw new UnauthorizedError('You are not authenticated')
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader: any = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    Jwt.verify(token as string, process.env.JWT_SECRET_KEY!, (err: any, user: any) => {
      if (err) {
        res.status(403).json('Invalid Token')
      } else {
        req.user = user
        next()
      }
    })
  } else {
    throw new UnauthorizedError('You are not authenticated')
  }
}

export const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction): void => {
  verifyToken(req, res, () => {
    const data = Object.values(req.user!.id)[0]
    if (data === req.body.user_owner) {
      next()
    } else {
      throw new UnauthorizedError('You are not allowed to do that!')
    }
  })
}

export const verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction): void => {
  verifyToken(req, res, () => {
    if (req.user!.is_admin) {
      next()
    } else {
      throw new UnauthorizedError('Only admins alowed to do that!')
    }
  })
}
