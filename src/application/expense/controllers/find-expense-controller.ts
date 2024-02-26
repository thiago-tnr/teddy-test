import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'

export type FindExpenseInputController = {
  expense_id: string
}
export type FindExpenseOutPutController = {
  expense_id: string
  description: string
  data: Date
  user_owner: string
  value: number
}

export class FindExpenseController implements Controller {
  constructor (
    private readonly useCase: UseCase<FindExpenseInputController, FindExpenseOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const expenseDto: FindExpenseInputController = request.body

    const find = await this.useCase.execute(expenseDto)
    return response.status(201).json(find)
  }
}
