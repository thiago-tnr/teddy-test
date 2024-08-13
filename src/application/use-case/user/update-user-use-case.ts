import { inject, injectable } from 'tsyringe'
import { type User } from '../../../domain/entities/user.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

export type UpdateUserInput = {
  user_id: string
  name?: string
  email?: string
  password?: string
}

export type UpdateUserOutPut = {
  user_id: string
  name?: string
  email?: string
  password?: string
}
@injectable()
export class UpdateUserUseCase implements UseCase<UpdateUserInput, UpdateUserOutPut> {
  constructor (
    @inject('UserRepository')
    private readonly repository: Repository<User>
  ) { }

  async execute (input: UpdateUserInput): Promise<UpdateUserOutPut> {
    const user = await this.repository.find(input.user_id)

    if (!user) throw new NotFoundError()

    input.name && user.changeName(input.name)

    await this.repository.update(user)

    return {
      user_id: user.user_id.id,
      name: user.name
    }
  }
}
