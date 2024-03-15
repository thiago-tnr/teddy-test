import 'reflect-metadata'
import { FindCarUseCase, type FindCarInput } from '../../../application/use-case/car'
import { Car } from '../../../domain/entities/car.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'

// Mock do repositório para simular a interação com o banco de dados
const mockRepository: Repository<Car> = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn()
}

// Mock do input para o teste
const mockInput: FindCarInput = {
  car_id: 'fb2459ea-753a-45f5-a0e2-becc9eae26b2'
}

// Mock do resultado para o teste
const mockCar: Car = new Car({
  car_id: Uuid.create('fb2459ea-753a-45f5-a0e2-becc9eae26b2'),
  plate: 'ABC1234',
  color: 'Red',
  brand: 'Toyota'
})

describe('FindCarUseCase', () => {
  // Teste para garantir que o carro é encontrado corretamente
  it('should find a car', async () => {
    // Arrange
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce(mockCar)
    const findCarUseCase = new FindCarUseCase(mockRepository)

    // Act
    const result = await findCarUseCase.execute(mockInput)

    // Assert
    expect(result.car_id).toBe(mockCar.car_id.id)
    expect(result.plate).toBe(mockCar.plate)
    expect(result.color).toBe(mockCar.color)
    expect(result.brand).toBe(mockCar.brand)
  })

  // Teste para garantir que o NotFoundError é lançado quando o carro não é encontrado
  it('should throw NotFoundError when car is not found', async () => {
    // Arrange
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce(null)
    const findCarUseCase = new FindCarUseCase(mockRepository)

    // Act and Assert
    await expect(findCarUseCase.execute(mockInput)).rejects.toThrow(NotFoundError)
  })
})
