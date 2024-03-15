import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'

export type FindCarInputController = {
  color?: string
  brand?: string
}
export type FindCarOutPutController = {
  car_id: string
  plate: string
  color: string
  brand: string
}
@injectable()
export class FindAllCarsController implements Controller {
  constructor (
    @inject('FindAllCarsUseCase')
    private readonly useCase: UseCase<FindCarInputController, FindCarOutPutController>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const carDto: FindCarInputController = request.body
    const find = await this.useCase.execute(carDto)
    return response.status(200).json(find)
  }
}
