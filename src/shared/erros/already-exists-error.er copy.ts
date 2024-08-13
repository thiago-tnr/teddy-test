export class AuthError extends Error {
  constructor (message?: string) {
    super(message ?? 'Not allowed')
    this.name = 'AuthError'
  }
}
