export class AppError extends Error {
  constructor (message?: string) {
    super(message ?? 'User already exists')
    this.name = 'AppError'
  }
}
