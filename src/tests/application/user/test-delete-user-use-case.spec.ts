import 'reflect-metadata'
import { DeleteUserUseCase, type DeleteUserInput } from '../../../application/use-case/user'
import { User } from '../../../domain/entities/user.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'

// Mock do repositório para simular a interação com o banco de dados
const mockRepository: Repository<User> = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  delete: jest.fn().mockResolvedValueOnce(undefined),
  findAll: jest.fn()
}

// Mock do input para o teste
const mockInput: DeleteUserInput = {
  user_id: 'mock_user_id'
}

const mockUser: User = new User({
  user_id: Uuid.create('dc85ee28-ee68-4fa0-8275-4fefae85dbc0'),
  name: 'John Doe'
})
describe('DeleteUserUseCase', () => {
  // Teste para garantir que um usuário seja deletado corretamente
  it('should delete a user', async () => {
    // Arrange
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce(mockUser)
    const deleteUserUseCase = new DeleteUserUseCase(mockRepository)

    // Act
    await deleteUserUseCase.execute(mockInput)

    // Assert
    expect(mockRepository.find).toHaveBeenCalledWith(mockInput.user_id)
    expect(mockRepository.delete).toHaveBeenCalledWith(mockInput.user_id)
  })

  // Teste para garantir que o NotFoundError seja lançado quando o usuário não é encontrado
  it('should throw NotFoundError when user is not found', async () => {
    // Arrange
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce(null)
    const deleteUserUseCase = new DeleteUserUseCase(mockRepository)

    // Act and Assert
    await expect(deleteUserUseCase.execute(mockInput)).rejects.toThrow(NotFoundError)
    expect(mockRepository.find).toHaveBeenCalledWith(mockInput.user_id)
    expect(mockRepository.delete).not.toHaveBeenCalled()
  })
})
