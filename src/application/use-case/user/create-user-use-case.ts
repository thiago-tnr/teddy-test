import { inject, injectable } from 'tsyringe'
import { User } from '../../../domain/entities/user.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import bcrypt from 'bcrypt'

export type CreateUserInput = {
  name: string
  email: string
  password: string
}

export type CreateUserOutPut = {
  user_id: string
  name: string
}
@injectable()
export class CreateUserUseCase implements UseCase<CreateUserInput, CreateUserOutPut> {
  constructor (
    @inject('UserRepository')
    private readonly repository: Repository<User>
  ) { }

  async execute (input: CreateUserInput): Promise<CreateUserOutPut> {
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(input.password, saltRounds)

    input.password = hashedPassword

    const user = User.create(input)

    await this.repository.create(user)

    return {
      user_id: user.user_id.id,
      name: user.name
    }
  }
}
