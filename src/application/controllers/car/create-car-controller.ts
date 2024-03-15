import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { CreateCarInput } from '../../../shared/validate/zod-validation'

export type CreateCarInputController = {
  plate: string
  color: string
  brand: string
}
export type CreateCarOutPutController = {
  car_id: string
  plate: string
  color: string
  brand: string
}

@injectable()
export class CreateCarController implements Controller {
  constructor (
    @inject('CreateCarUseCase')
    private readonly useCase: UseCase<CreateCarInputController, CreateCarOutPutController>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const carDto: CreateCarInputController = CreateCarInput.parse(request.body)
    const created = await this.useCase.execute(carDto)

    return response.status(201).json(created)
  }
}
