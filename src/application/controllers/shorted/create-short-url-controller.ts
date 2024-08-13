import { inject, injectable } from 'tsyringe'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { type Request, type Response } from 'express'
import { RequiredError } from '../../../shared/erros/required-error.er'
import { TokenService } from '../../../shared/helper/token-verify'

export type ShortUrlInput = {
  url: string
  userId?: string
}
export type ShortUrlOutput = {
  shortUrl: string
}

@injectable()
export class ShortUrlController implements Controller {
  constructor (
    @inject('ShortUrlUseCase')
    private readonly useCase: UseCase<ShortUrlInput, ShortUrlOutput>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { url }: ShortUrlInput = request.body
    const userId = TokenService.getUserIdFromRequest(request)
    console.log(userId, 'userId')
    if (!url) throw new RequiredError('Url is required')
    const shortUrl = await this.useCase.execute({ url, userId })

    return response.status(201).json(shortUrl)
  }
}
