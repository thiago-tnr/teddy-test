import { inject, injectable } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { type User } from '../../../domain/entities/user.entity'

export type FindAllUserInput = {
  name?: string
}

export type FindAllUserOutPut = {
  user_id: string
  name: string
}
@injectable()
export class FindAllUserUseCase implements UseCase<FindAllUserInput, FindAllUserOutPut[]> {
  constructor (
    @inject('UserRepository')
    private readonly repository: Repository<User>
  ) { }

  async execute (input?: FindAllUserInput): Promise<FindAllUserOutPut[]> {
    const users = await this.repository.findAll()
    let filteredUsers = users
    if (filteredUsers && input!.name) {
      filteredUsers = filteredUsers.filter(user => user.name.includes(input!.name!))
      // Se não houver usuários com o nome fornecido, lançar um NotFoundError
      if (filteredUsers.length === 0) {
        throw new NotFoundError(`No users found with name containing: ${input!.name}`)
      }
      // Mapear os usuários filtrados para o formato de saída e retornar
    }
    return filteredUsers!.map(user => ({
      user_id: user.user_id.id,
      name: user.name
    }))
  }
}
