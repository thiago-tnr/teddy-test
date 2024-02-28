import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { LoginValidate } from '../../../shared/validate/zod-validation'
import { inject, injectable } from 'tsyringe'

export type LoginUserControllerInput = {
  email: string
  password: string
}

export type LoginUserControllerOutPut = {
  token: string
  refresh_token: string
  user_id?: string
  is_admin?: string
}
@injectable()
export class LoginUserController implements Controller {
  constructor (
    @inject('LoginUserUseCase')
    private readonly useCase: UseCase<LoginUserControllerInput, LoginUserControllerOutPut>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = LoginValidate.parse(request.body)

      const user = await this.useCase.execute({ email, password })

      if (!user) response.status(404).json({ error: 'User not Found or email or password is wrong' })

      const token = jwt.sign({
        id: user.user_id,
        is_admin: user.is_admin
      }, process.env.JWT_SECRET_KEY!,
      { expiresIn: '1h' })

      const refreshToken = jwt.sign({
        id: user.user_id
      }, process.env.REFRESH_JWT_SEC!,
      { expiresIn: '12h' })

      return response.status(200).json({ token, refreshToken })
    } catch (error) {
      console.error(error)
    }
    return response.status(500).json({ error: 'Internal Server Error' })
  }
}
