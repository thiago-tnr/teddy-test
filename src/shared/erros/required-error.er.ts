export class RequiredError extends Error {
  constructor (message?: string) {
    super(message ?? 'Field is required')
    this.name = 'RequiredError'
  }
}
