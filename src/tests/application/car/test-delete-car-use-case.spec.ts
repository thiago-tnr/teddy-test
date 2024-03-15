import 'reflect-metadata'
import { type DeleteCarInput, DeleteCarUseCase } from '../../../application/use-case/car'
import { Car } from '../../../domain/entities/car.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

const mockRepository: Repository<Car> = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn()
}
// Mock do input para o teste
const mockInput: DeleteCarInput = {
  car_id: '123',
  user_id: '456'
}

describe('DeleteCarUseCase', () => {
  // Teste para garantir que um carro é excluído corretamente
  it('should delete a car', async () => {
    // Arrange
    const deleteCarUseCase = new DeleteCarUseCase(mockRepository)
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce(new Car({
      plate: 'ABC1234',
      color: 'Red',
      brand: 'Toyota'
    }))

    // Act
    await deleteCarUseCase.execute(mockInput)

    // Assert
    expect(mockRepository.delete).toHaveBeenCalledWith(mockInput.car_id)
  })

  // Teste para garantir que um erro seja lançado se o carro não for encontrado
  it('should throw an error if car is not found', async () => {
    // Arrange
    const deleteCarUseCase = new DeleteCarUseCase(mockRepository)
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce(null)

    // Act & Assert
    await expect(deleteCarUseCase.execute(mockInput)).rejects.toThrow(NotFoundError)
  })
})
