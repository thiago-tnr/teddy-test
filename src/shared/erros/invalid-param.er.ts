export class InvalidParamError extends Error {
  constructor (message?: string) {
    super(message ?? 'This param is invalid')
    this.name = 'InvalidParamError'
  }
}
