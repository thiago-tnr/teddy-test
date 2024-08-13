import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type NextFunction, type Request, type Response } from 'express'
import { ZodError } from 'zod'

export const errorValidate = (err: Error, request: Request, response: Response, next: NextFunction): Response => {
  // Handle cases where `err` is not an `Error`
  if (err instanceof ZodError) {
    const errorMessages = err.errors.map(error => error.message)
    return response.status(400).json({
      status: 'ZodError',
      message: `Some param is invalid: ${errorMessages.join(', ')}`
    })
  }

  if (err instanceof PrismaClientKnownRequestError) {
    return response.status(400).json({
      status: 'Prisma Request Error',
      message: 'Ensures that url'
    })
  }

  if (!(err instanceof Error)) {
    return response.status(500).json({
      error: err,
      status: 'InternalServerError',
      message: 'An unexpected error occurred.'
    })
  }

  switch (err.name) {
    case 'InvalidUuidError':
      return response.status(400).json({
        status: err.name,
        message: err.message
      })
    case 'InvalidParamError':
      return response.status(400).json({
        status: err.name,
        message: err.message
      })
    case 'RequiredError':
      return response.status(403).json({
        status: err.name,
        message: err.message
      })
    case 'AuthError':
      return response.status(403).json({
        status: err.name,
        message: err.message
      })
    case 'NotFoundError':
      return response.status(404).json({
        status: err.name,
        message: err.message
      })
    case 'EntityValidationError':
      return response.status(400).json({
        status: err.name,
        message: err.message
      })
    default:
      return response.status(500).json({
        status: 'InternalServerError',
        message: 'An unexpected error occurred.'
      })
  }
}
