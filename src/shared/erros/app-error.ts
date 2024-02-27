export default class AppError {
  public message: string
  public statusCode: number

  constructor (message?: string, StatusCode?: number) {
    this.message = message
    this.statusCode = StatusCode
  }
}
