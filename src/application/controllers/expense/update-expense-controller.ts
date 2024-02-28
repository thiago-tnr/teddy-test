import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { InvalidUuidError } from '../../../shared/erros/invalid-uuid-error.er'
import { UpdateExpenseInput } from '../../../shared/validate/zod-validation'
import { findUser } from '../../../shared/helper/find-user-by-token'

export type UpdateExpenseInputController = {
  expense_id: string
  description?: string
  value?: number
  user_id?: string
}
export type UpdateExpenseOutPutController = {
  expense_id: string
  description: string
  data: Date
  user_owner: any
  value: number
}
@injectable()
export class UpdateExpenseController implements Controller {
  constructor (
    @inject('UpdateExpenseUseCase')
    private readonly useCase: UseCase<UpdateExpenseInputController, UpdateExpenseOutPutController>
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const expenseDto: UpdateExpenseInputController = UpdateExpenseInput.parse(request.body)

    if (!expenseDto.expense_id) throw new InvalidUuidError()

    const user_id = findUser(request)

    expenseDto.user_id = user_id

    const updated = await this.useCase.execute(expenseDto)
    return response.status(201).json(updated)
  }
}
