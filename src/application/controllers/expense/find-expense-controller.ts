import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { FindInput } from '../../../shared/validate/zod-validation'
import { findUser } from '../../../shared/helper/find-user-by-token'

export type FindExpenseInputController = {
  expense_id: string
  user_id?: string
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
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const expenseDto = FindInput.parse(request.params.expense_id)
    const user_id = findUser(request)
    const find = await this.useCase.execute({ expense_id: expenseDto, user_id })
    return response.status(201).json(find)
  }

  findUser (request: Request): string {
    const authHeader: any = request.headers.authorization
    const token: string = authHeader.split(' ')[1]
    const decodedToken: any = jwt.decode(token)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const user_id = Object.values(decodedToken.id!)[0] as string
    return user_id
  }
}
