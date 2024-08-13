/* eslint-disable @typescript-eslint/consistent-type-assertions */
import bcrypt from 'bcrypt'
import 'reflect-metadata'
import LoginUserUseCase, { type UserLoginInputUseCase } from '../../../application/use-case/auth/user-use-case.ts'
import { type User } from '../../../domain/entities/user.entity.ts'
import { type Repository } from '../../../infra/protocols/repository-interface.ts'
import { AppError } from '../../../shared/erros/app-error.er.ts'

// Mock da implementação do Repository
const repositoryMock: Partial<Repository<User>> = {
  findByEmail: jest.fn()
}

// Mock do bcrypt
jest.mock('bcrypt', () => ({
  compare: jest.fn()
}))

describe('LoginUserUseCase', () => {
  let loginUserUseCase: LoginUserUseCase

  beforeEach(() => {
    loginUserUseCase = new LoginUserUseCase(repositoryMock as Repository<User>)
  })

  it('should throw an error if email or password are missing', async () => {
    const input: UserLoginInputUseCase = { email: '', password: '' }
    await expect(loginUserUseCase.execute(input)).rejects.toThrow(AppError)
  })

  it('should throw an error if user is not found', async () => {
    const input: UserLoginInputUseCase = { email: 'test@example.com', password: 'password123' }
    repositoryMock.findByEmail = jest.fn().mockResolvedValue(null)

    await expect(loginUserUseCase.execute(input)).rejects.toThrow(AppError)
  })

  it('should throw an error if password does not match', async () => {
    const input: UserLoginInputUseCase = { email: 'test@example.com', password: 'password123' }
    const user = { email: 'test@example.com', password: 'hashedPassword' }
    repositoryMock.findByEmail = jest.fn().mockResolvedValue(user)
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)

    await expect(loginUserUseCase.execute(input)).rejects.toThrow(AppError)
  })

  it('should return the user if email and password are correct', async () => {
    const input: UserLoginInputUseCase = { email: 'test@example.com', password: 'password123' }
    const user: User = { email: 'test@example.com', password: 'hashedPassword' } as User
    repositoryMock.findByEmail = jest.fn().mockResolvedValue(user)
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)

    const result = await loginUserUseCase.execute(input)
    expect(result).toEqual(user)
  })
})
