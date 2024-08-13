import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { ShortUrl } from '../../../shared/validate/zod-validation'

export type GetUrlInputController = {
  shortUrl: string
}
export type GetUrlOutPutController = {
  originalUrl: string
}
@injectable()
export class GetUrlController implements Controller {
  constructor (
    @inject('GetUrlUseCase')
    private readonly useCase: UseCase<GetUrlInputController, GetUrlOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const shortUrl = ShortUrl.parse(request.params.shortUrl)
    const find = await this.useCase.execute({ shortUrl })

    const originalUrl = find.originalUrl.startsWith('http://') || find.originalUrl.startsWith('https://')
      ? find.originalUrl
      : `http://${find.originalUrl}`

    response.redirect(originalUrl)
  }
}
