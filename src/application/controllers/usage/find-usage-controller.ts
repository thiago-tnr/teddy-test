import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'

export type CarUsed = {
  plate: string
  color: string
  brand: string
}
export type FindCarUsageOutPutController = {
  carUsageId: string
  startDate: Date
  endDate: Date
  driver: string
  car: CarUsed
  reason: string
}

@injectable()
export class FindCarUsageController implements Controller {
  constructor (
    @inject('FindCarUsageUseCase')
    private readonly useCase: UseCase<any, FindCarUsageOutPutController[]>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const find = await this.useCase.execute('')
    return response.status(201).json(find)
  }
}
