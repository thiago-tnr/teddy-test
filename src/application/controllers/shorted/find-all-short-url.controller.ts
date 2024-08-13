import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { TokenService } from '../../../shared/helper/token-verify'
import { AuthError } from '../../../shared/erros/already-exists-error.er copy'

export type FindAllUrlInputController = {
  userId: string
}
export type FindAllUrlOutPutController = {
  originalUrl: string
}
@injectable()
export class FindAllUrlController implements Controller {
  constructor (
    @inject('FindAllUrlUseCase')
    private readonly useCase: UseCase<FindAllUrlInputController, FindAllUrlOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const userId = TokenService.getUserIdFromRequest(request)

    if (!userId) throw new AuthError()

    const shortUrl = await this.useCase.execute({ userId })

    return response.status(200).json(shortUrl)
  }
}
