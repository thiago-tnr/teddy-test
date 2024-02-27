import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { FindExpenseInput } from '../../../shared/validate/expense-zod-validation'

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
@injectable()
export class FindExpenseController implements Controller {
  constructor (
    @inject('FindExpenseUseCase')
    private readonly useCase: UseCase<FindExpenseInputController, FindExpenseOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const expenseDto = FindExpenseInput.parse(request.params.expense_id)

    const find = await this.useCase.execute({ expense_id: expenseDto })
    return response.status(201).json(find)
  }
}
