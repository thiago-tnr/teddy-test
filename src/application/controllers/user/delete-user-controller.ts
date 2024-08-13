import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { ShortUrl } from '../../../shared/validate/zod-validation'

export type DeleteUserInputController = {
  shortUrl: string
}
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type DeleteUserOutPutController = void
@injectable()
export class DeleteUserController implements Controller {
  constructor (
    @inject('DeleteUserUseCase')
    private readonly useCase: UseCase<DeleteUserInputController, DeleteUserOutPutController>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const shortUrl = ShortUrl.parse(request.body)

    await this.useCase.execute({ shortUrl })
    return response.status(201).json({ message: 'Deleted with success' })
  }
}
