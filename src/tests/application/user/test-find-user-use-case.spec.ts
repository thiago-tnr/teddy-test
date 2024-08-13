import 'reflect-metadata'
import { FindUserUseCase, type FindUserInput } from '../../../application/use-case/user'
import { User } from '../../../domain/entities/user.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

// Mock do repositório para simular a interação com o banco de dados
const mockRepository: Repository<User> = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findByEmail: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn()
}

// Mock do input para o teste
const mockInput: FindUserInput = {
  user_id: 'mock_user_id'
}

const mockUser: User = new User({
  user_id: Uuid.create('dc85ee28-ee68-4fa0-8275-4fefae85dbc0'),
  name: 'John Doe'
})

describe('FindUserUseCase', () => {
  // Teste para garantir que um usuário seja encontrado corretamente
  it('should find a user', async () => {
    // Arrange
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce(mockUser)
    const findUserUseCase = new FindUserUseCase(mockRepository)

    // Act
    const result = await findUserUseCase.execute(mockInput)

    // Assert
    expect(result.user_id).toBe('dc85ee28-ee68-4fa0-8275-4fefae85dbc0')
    expect(result.name).toBe('John Doe')
    expect(mockRepository.find).toHaveBeenCalledWith(mockInput.user_id)
  })

  // Teste para garantir que o NotFoundError seja lançado quando o usuário não é encontrado
  it('should throw NotFoundError when user is not found', async () => {
    // Arrange
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce(null)
    const findUserUseCase = new FindUserUseCase(mockRepository)

    // Act and Assert
    await expect(findUserUseCase.execute(mockInput)).rejects.toThrow(NotFoundError)
  })
})
