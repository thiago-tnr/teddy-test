import { inject, injectable } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { type User } from '../../../domain/entities/user.entity'

export type FindUserInput = {
  user_id: string
}

export type FindUserOutPut = {
  user_id: string
  name: string
}
@injectable()
export class FindUserUseCase implements UseCase<FindUserInput, FindUserOutPut> {
  constructor (
    @inject('UserRepository')
    private readonly repository: Repository<User>
  ) { }

  async execute (input: FindUserInput): Promise<FindUserOutPut> {
    const user = await this.repository.find(input.user_id)

    if (!user) throw new NotFoundError()

    return {
      user_id: user.user_id.id,
      name: user.name
    }
  }
}
