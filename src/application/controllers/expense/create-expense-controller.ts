import { type Request, type Response } from 'express'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { CreateExpenseInput } from '../../../shared/validate/zod-validation'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { sendEmail } from '../../../shared/helper/send-email'
import { dataValidate } from '../../../shared/helper/data-validate'

export type CreateExpenseInputController = {
  description: string
  user_owner: string
  data?: string
  value: number
}
export type CreateExpenseOutPutController = {
  expense_id: string
  description: string
  data: Date
  user_owner: string
  value: number
}

export type FindUserInputController = {
  user_id: string
}
// TODO updated_at is missing!
export type FindUserOutPutController = {
  user_id: string
  name: string
  email: string
}
@injectable()
export class CreateExpenseController implements Controller {
  constructor (
    @inject('CreateExpenseUseCase')
    private readonly useCase: UseCase<CreateExpenseInputController, CreateExpenseOutPutController>,
    @inject('FindUserUseCase')
    private readonly findUseCase: UseCase<FindUserInputController, FindUserOutPutController>
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const expenseDto: CreateExpenseInputController = CreateExpenseInput.parse(request.body)

    if (expenseDto.data) {
      const newDataValidate = dataValidate(expenseDto.data)
      expenseDto.data = newDataValidate
    }

    const created = await this.useCase.execute(expenseDto)
    const findUser = await this.findUseCase.execute({ user_id: expenseDto.user_owner })

    if (!findUser) throw new NotFoundError()

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    sendEmail(findUser.email, created)

    return response.status(201).json(created)
  }
}
