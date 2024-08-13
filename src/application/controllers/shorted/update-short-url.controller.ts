import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { TokenService } from '../../../shared/helper/token-verify'
import { AuthError } from '../../../shared/erros/already-exists-error.er copy'

export type UpdateUrlInputController = {
  userId: string
  url: string
  newUrl: string
}
export type UpdateUrlOutPutController = {
  originalUrl: string
}
@injectable()
export class UpdateUrlController implements Controller {
  constructor (
    @inject('UpdateUrlUseCase')
    private readonly useCase: UseCase<UpdateUrlInputController, UpdateUrlOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const userId = TokenService.getUserIdFromRequest(request)
    const { url, newUrl } = request.body

    if (!userId) throw new AuthError()

    const shortUrl = await this.useCase.execute({ userId, url, newUrl })

    return response.status(200).json(shortUrl)
  }
}
