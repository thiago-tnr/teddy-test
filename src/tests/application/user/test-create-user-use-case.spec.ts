import 'reflect-metadata'
import { CreateUserUseCase, type CreateUserInput } from '../../../application/use-case/user'
import { User } from '../../../domain/entities/user.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'

// Mock do repositório para simular a interação com o banco de dados
const mockRepository: Repository<User> = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn()
}

// Mock do input para o teste
const mockInput: CreateUserInput = {
  name: 'John Doe'
}

describe('CreateUserUseCase', () => {
  // Teste para garantir que um usuário seja criado corretamente
  it('should create a user', async () => {
    // Arrange
    const createUserUseCase = new CreateUserUseCase(mockRepository)

    // Act
    const result = await createUserUseCase.execute(mockInput)

    // Assert
    expect(result.user_id).toBeTruthy()
    expect(result.name).toBe(mockInput.name)
    expect(mockRepository.create).toHaveBeenCalledWith(expect.any(User))
  })
})
