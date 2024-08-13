import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { FindInput } from '../../../shared/validate/zod-validation'

export type FindUserInputController = {
  user_id: string
}
export type FindUserOutPutController = {
  user_id: string
  name: string
}
@injectable()
export class FindUserController implements Controller {
  constructor (
    @inject('FindUserUseCase')
    private readonly useCase: UseCase<FindUserInputController, FindUserOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const userDto = FindInput.parse(request.params.user_id)

    const find = await this.useCase.execute({ user_id: userDto })
    return response.status(201).json(find)
  }
}
