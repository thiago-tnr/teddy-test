import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { UseCase } from '../../../shared/application/protocol/use-case-interface'

export type UserLoginInputController = {
  email: string
  password: string
}

export type UserLoginOutPutController = any
@injectable()
export class LoginUserController {
  constructor (
    @inject('LoginUserUseCase')
    private readonly useCase: UseCase<UserLoginInputController, UserLoginOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const user = await this.useCase.execute({ email, password })

    const token = jwt.sign({
      id: user.user_id
    }, process.env.JWT_SEC!,
    { expiresIn: '1h' })

    const refreshToken = jwt.sign({
      id: user.user_id
    }, process.env.REFRESH_JWT_SEC!,
    { expiresIn: '12h' })

    return response.status(200).json({ token, refreshToken })
  }
}
