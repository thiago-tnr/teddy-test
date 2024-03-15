import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'

export type CarUsageInputController = {
  startDate: Date
  driver: string
  car: string
  reason: string
}

export type CarUsageOutPutController = {
  carUsageId: string
  startDate: Date
  driver: string
  car: string
  reason: string
}
@injectable()
export class CreateCarUsageController implements Controller {
  constructor (
    @inject('CreateCarUsageUseCase')
    private readonly useCase: UseCase<CarUsageInputController, CarUsageOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const usageDto: CarUsageInputController = request.body

    const created = await this.useCase.execute(usageDto)

    return response.status(201).json(created)
  }
}
