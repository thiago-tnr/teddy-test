import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'

export type FindAllUserInputController = {
  name?: string
}
export type FindAllUserOutPutController = {
  user_id: string
  name: string
}
@injectable()
export class FindAllUserController implements Controller {
  constructor (
    @inject('FindAllUserUseCase')
    private readonly useCase: UseCase<FindAllUserInputController, FindAllUserOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const userDto: FindAllUserInputController = request.body

    const find = await this.useCase.execute(userDto)
    return response.status(201).json(find)
  }
}
