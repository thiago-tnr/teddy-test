import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { FindInput } from '../../../shared/validate/zod-validation'

export type DeleteUserInputController = {
  user_id: string
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
    const UserDto = FindInput.parse(request.params.user_id)

    await this.useCase.execute({ user_id: UserDto })
    return response.status(201).json({ message: 'Deleted with success' })
  }
}
