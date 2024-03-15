import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { FindInput } from '../../../shared/validate/zod-validation'

export type FindCarInputController = {
  car_id: string
}
export type FindCarOutPutController = {
  car_id: string
  plate: string
  color: string
  brand: string
}
@injectable()
export class FindCarController implements Controller {
  constructor (
    @inject('FindCarUseCase')
    private readonly useCase: UseCase<FindCarInputController, FindCarOutPutController>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const carDto = FindInput.parse(request.params.car_id)
    const find = await this.useCase.execute({ car_id: carDto })
    return response.status(201).json(find)
  }
}
