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
      message: 'Ensures that the car plate and user exist'
    })
  }

  if (!(err instanceof Error)) {
    return response.status(500).json({
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
    case 'UsageError':
      return response.status(403).json({
        status: err.name,
        message: err.message
      })
    case 'AlreadyExistsError':
      return response.status(409).json({
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
