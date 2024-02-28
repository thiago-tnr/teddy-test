export class AlreadyExistsError extends Error {
  constructor (message?: string) {
    super(message ?? 'User already exists')
    this.name = 'AlreadyExistsError'
  }
}
