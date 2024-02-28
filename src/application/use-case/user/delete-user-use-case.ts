import { inject, injectable } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { type User } from '../../../domain/entities/user.entity'

export type DeleteUserInput = {
  user_id: string
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type DeleteUserOutPut = void
@injectable()
export class DeleteUserUseCase implements UseCase<DeleteUserInput, DeleteUserOutPut> {
  constructor (
    @inject('UserRepository')
    private readonly repository: Repository<User>
  ) { }

  async execute (input: DeleteUserInput): Promise<DeleteUserOutPut> {
    const user = await this.repository.find(input.user_id)

    if (!user) throw new NotFoundError()

    await this.repository.delete(input.user_id)
  }
}
