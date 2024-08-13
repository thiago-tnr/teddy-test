import bcrypt from 'bcrypt'
import { AppError } from '../../../shared/erros/app-error.er.ts'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface.ts'
import { inject, injectable } from 'tsyringe'
import { type User } from '../../../domain/entities/user.entity.ts'
import { Repository } from '../../../infra/protocols/repository-interface.ts'

export type UserLoginInputUseCase = {
  email: string
  password: string
}

export type UserLoginOutPutUseCase = User
@injectable()
export default class LoginUserUseCase implements UseCase<UserLoginInputUseCase, UserLoginOutPutUseCase> {
  constructor (
    @inject('UserRepository')
    private readonly repository: Repository<User>
  ) { }

  async execute ({ email, password }: UserLoginInputUseCase): Promise<User> {
    if (email && password) {
      const user = await this.repository.findByEmail(email)
      if (!user) {
        throw new AppError('Email or password wrong, or user not found, try again')
      }

      const hashedPassword = user.password

      const compareHashedPassword = await bcrypt.compare(password, hashedPassword)

      if (!compareHashedPassword) {
        throw new AppError('Email or password wrong, try again')
      }

      return user
    } else {
      throw new AppError('Email or password worng, try again')
    }
  }
}
