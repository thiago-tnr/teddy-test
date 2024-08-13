import 'reflect-metadata'
import { UpdateUserUseCase, type UpdateUserInput } from '../../../application/use-case/user'
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
const mockInput: UpdateUserInput = {
  user_id: 'mock_user_id',
  name: 'John Doe'
}

const mockUser: User = new User({
  user_id: Uuid.create('dc85ee28-ee68-4fa0-8275-4fefae85dbc0'),
  name: 'John Doe'
})

describe('UpdateUserUseCase', () => {
  // Teste para garantir que um usuário seja atualizado corretamente
  it('should update a user', async () => {
    // Arrange
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce(mockUser)
    const updateUserUseCase = new UpdateUserUseCase(mockRepository)

    // Act
    const result = await updateUserUseCase.execute(mockInput)

    // Assert
    expect(mockRepository.find).toHaveBeenCalledWith(mockInput.user_id)
    expect(mockRepository.update).toHaveBeenCalledWith(mockUser)
    expect(result.user_id).toBe(mockUser.user_id.id)
    expect(result.name).toBe(mockInput.name)
  })

  // Teste para garantir que o NotFoundError seja lançado quando o usuário não é encontrado
  it('should throw NotFoundError when user is not found', async () => {
    // Arrange
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce(null)
    const updateUserUseCase = new UpdateUserUseCase(mockRepository)

    // Act and Assert
    await expect(updateUserUseCase.execute(mockInput)).rejects.toThrow(NotFoundError)
    expect(mockRepository.find).toHaveBeenCalledWith(mockInput.user_id)
    expect(mockRepository.update).not.toHaveBeenCalled()
  })
})
