import bcrypt from 'bcrypt'
import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { CreateUserInputValidate } from '../../../shared/validate/zod-validation'

export type CreateUserInputController = {
  user_id?: string
  name: string
  email: string
  password: string
}

export type CreateUserOutPutController = {
  user_id: string
  name: string
  email: string
  message?: string
}
@injectable()
export class CreateUserController implements Controller {
  constructor (
    @inject('CreateUserUseCase')
    private readonly useCase: UseCase<CreateUserInputController, CreateUserOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const userDto: CreateUserInputController = CreateUserInputValidate.parse(request.body)

    const saltRounds = parseInt('10')
    userDto.password = await bcrypt.hash(userDto.password, saltRounds)

    const created = await this.useCase.execute(userDto)

    return response.status(201).json(created)
  }
}
