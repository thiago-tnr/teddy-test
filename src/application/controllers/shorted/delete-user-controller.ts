import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { TokenService } from '../../../shared/helper/token-verify'
import { RequiredError } from '../../../shared/erros/required-error.er'
import { AuthError } from '../../../shared/erros/already-exists-error.er copy'

export type DeleteShortUrlInputController = {
  shortUrl: string
  userId: string
}
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type DeleteShortUrlOutPutController = void
@injectable()
export class DeleteShortUrlController implements Controller {
  constructor (
    @inject('DeleteShortUrlUseCase')
    private readonly useCase: UseCase<DeleteShortUrlInputController, DeleteShortUrlOutPutController>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const userId = TokenService.getUserIdFromRequest(request)
    const { shortUrl } = request.body

    if (!userId) throw new AuthError()
    if (!shortUrl) throw new RequiredError('ShortUrl is required')

    await this.useCase.execute({ shortUrl, userId })
    return response.status(201).json({ message: 'Deleted with success' })
  }
}
