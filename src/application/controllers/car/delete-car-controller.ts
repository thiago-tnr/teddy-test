import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { FindInput } from '../../../shared/validate/zod-validation'

export type DeleteCarInputController = {
  car_id: string
}
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type DeleteCarOutPutController = void
@injectable()
export class DeleteCarController implements Controller {
  constructor (
    @inject('DeleteCarUseCase')
    private readonly useCase: UseCase<DeleteCarInputController, DeleteCarOutPutController>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const carDto = FindInput.parse(request.params.car_id)
    await this.useCase.execute({ car_id: carDto })
    return response.status(201).json({ message: 'Deleted with success' })
  }
}
