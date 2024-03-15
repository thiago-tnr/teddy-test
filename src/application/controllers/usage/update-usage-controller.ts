import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'

export type UpdateCarUsageInputController = {
  drive: string
  endDate: Date
}
export type UpdateCarUsageOutPutController = {
  carUsageId: string
  startDate: Date
  endDate: Date
  driver: string
  car: string
  reason: string
}
@injectable()
export class UpdateCarUsageController implements Controller {
  constructor (
    @inject('UpdateCarUsageUseCase')
    private readonly useCase: UseCase<UpdateCarUsageInputController, UpdateCarUsageOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const CarUsageDto: UpdateCarUsageInputController = request.body

    const updated = await this.useCase.execute(CarUsageDto)
    return response.status(201).json(updated)
  }
}
