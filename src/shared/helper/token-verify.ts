import { type Request } from 'express'
import jwt from 'jsonwebtoken'

export class TokenService {
  public static getUserIdFromRequest (request: Request): string | undefined {
    const authHeader = request.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return
    }

    const token = authHeader.substring(7) as string

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SEC!)
      return decoded.id.id
    } catch (err) {
      console.error('Invalid token:', err)
    }
  }
}
