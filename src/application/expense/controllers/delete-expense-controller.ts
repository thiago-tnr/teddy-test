import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'

export type UpdateExpenseInputController = {
  expense_id: string
}
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type UpdateExpenseOutPutController = void

export class FindExpenseController implements Controller {
  constructor (
    private readonly useCase: UseCase<UpdateExpenseInputController, UpdateExpenseOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const expenseDto: UpdateExpenseInputController = request.body

    await this.useCase.execute(expenseDto)
    return response.status(201).json({ message: 'Deleted with success' })
  }
}
