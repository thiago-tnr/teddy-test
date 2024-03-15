import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { UpdateCarInput } from '../../../shared/validate/zod-validation'

export type UpdateCarInputController = {
  car_id: string
  plate?: string
  color?: string
  brand?: string
}
export type UpdateCarOutPutController = {
  car_id: string
  plate: string
  color: string
  brand: string
}
@injectable()
export class UpdateCarController implements Controller {
  constructor (
    @inject('UpdateCarUseCase')
    private readonly useCase: UseCase<UpdateCarInputController, UpdateCarOutPutController>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const carDto: UpdateCarInputController = UpdateCarInput.parse(request.body)
    const updated = await this.useCase.execute(carDto)
    return response.status(201).json(updated)
  }
}
