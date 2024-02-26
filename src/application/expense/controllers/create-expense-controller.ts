import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'

export type CreateExpenseInputController = {
  description: string
  user_owner: any
  value: number
}
export type CreateExpenseOutPutController = {
  expense_id: string
  description: string
  data: Date
  user_owner: any
  value: number
}

export class CreateExpenseController implements Controller {
  constructor (
    private readonly useCase: UseCase<CreateExpenseInputController, CreateExpenseOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const expenseDto: CreateExpenseInputController = request.body

    const created = await this.useCase.execute(expenseDto)
    return response.status(201).json(created)
  }
}
