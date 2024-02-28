import { type Request } from 'express'
import jwt from 'jsonwebtoken' // Assuming you have 'jsonwebtoken' installed

export const findUser = (request: Request): string | undefined => {
  // Check if authorization header exists
  if (!request.headers.authorization) {
    return undefined // No user found
  }

  const authHeader: string = request.headers.authorization
  const token: string = authHeader.split(' ')[1]

  try {
    // Decode the JWT token
    const decodedToken: any = jwt.decode(token)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const user_id = Object.values(decodedToken.id!)[0] as string
    return user_id
  } catch (error) {
    // Handle JWT verification errors (e.g., invalid signature, expired token)
    console.error('Error decoding JWT token:', error)
    return undefined // No user found due to invalid token
  }
}
