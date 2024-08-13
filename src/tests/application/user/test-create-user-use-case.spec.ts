import 'reflect-metadata'
import bcrypt from 'bcrypt'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { User } from '../../../domain/entities/user.entity'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { type CreateUserInput, CreateUserUseCase } from '../../../application/use-case/user'

const repositoryMock: Partial<Repository<User>> = {
  create: jest.fn()
}

jest.mock('bcrypt', () => ({
  hash: jest.fn()
}))

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(repositoryMock as Repository<User>)
  })

  it('should create a user with hashed password', async () => {
    // Arrange
    const input: CreateUserInput = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'plainpassword'
    }

    const hashedPassword = 'hashedpassword'
    const userId = new Uuid()
   ;(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword)

    const user = new User({
      user_id: userId,
      name: input.name,
      email: input.email,
      password: hashedPassword
    })

    jest.spyOn(User, 'create').mockReturnValue(user)

    // Mock repository.create to do nothing
    jest.spyOn(repositoryMock, 'create').mockResolvedValue(undefined)

    // Act
    const result = await createUserUseCase.execute(input)

    // Assert
    expect(result).toEqual({
      user_id: userId.id,
      name: input.name
    })
    expect(repositoryMock.create).toHaveBeenCalledWith(user)
  })

  it('should throw an error if User.create fails', async () => {
    // Arrange
    const input: CreateUserInput = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'plainpassword'
    }

    const hashedPassword = 'hashedpassword'

    ;(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword)
    jest.spyOn(User, 'create').mockImplementation(() => { throw new Error('Creation failed') })

    // Act & Assert
    await expect(createUserUseCase.execute(input)).rejects.toThrow('Creation failed')
  })
})
