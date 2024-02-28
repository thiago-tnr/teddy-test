import bcrypt from 'bcrypt'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type User } from '../../../domain/entities/user.entity'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { inject, injectable } from 'tsyringe'

export type LoginUserUseCaseInput = {
  email: string
  password: string
  token?: string
}

export type LoginUserUseCaseOutPut = User | null
@injectable()
export default class LoginUserUseCase implements UseCase<LoginUserUseCaseInput, LoginUserUseCaseOutPut> {
  constructor (
    @inject('UserRepository')
    private readonly repository: Repository<User>) {
  }

  async execute ({ email, password }: LoginUserUseCaseInput): Promise<User | null> {
    try {
      if (email && password) {
        const userLogin = await this.repository.findByEmail(email)

        if (!userLogin) throw new NotFoundError('User notfound to this email')

        const hashedPassword = userLogin.password
        const compareHashedPassword = await bcrypt.compare(password, hashedPassword)

        if (!compareHashedPassword) {
          return null
        }

        return userLogin
      } else {
        throw new Error('Email or password wrong, try again')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
