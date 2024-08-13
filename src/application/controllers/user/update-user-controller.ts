import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { FindInputUpdateUser } from '../../../shared/validate/zod-validation'

export type UpdateUserInputController = {
  user_id: string
  name: string
}
export type UpdateUserOutPutController = {
  user_id: string
  name: string
}
@injectable()
export class UpdateUserController implements Controller {
  constructor (
    @inject('UpdateUserUseCase')
    private readonly useCase: UseCase<UpdateUserInputController, UpdateUserOutPutController>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const userDto: UpdateUserInputController = FindInputUpdateUser.parse(request.body)

    const updated = await this.useCase.execute(userDto)
    return response.status(201).json(updated)
  }
}
