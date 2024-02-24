export class EntityValidationError extends Error {
  constructor (message?: string) {
    super(message ?? 'Validation Error')
    this.name = 'EntityValidationError'
  }
}
