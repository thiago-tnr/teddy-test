import 'reflect-metadata'
import { CreateCarUseCase, type CreateCarInput } from '../../../application/use-case/car'
import { Car } from '../../../domain/entities/car.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'

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
const mockInput: CreateCarInput = {
  plate: 'ABC1234',
  color: 'Red',
  brand: 'Toyota'
}

describe('CreateCarUseCase', () => {
  // Teste para garantir que uma instância de Car seja criada corretamente
  it('should create a car instance', async () => {
    // Arrange
    const createCarUseCase = new CreateCarUseCase(mockRepository)

    // Act
    const result = await createCarUseCase.execute(mockInput)

    // Assert
    expect(result.car_id).toBeTruthy()
    expect(result.plate).toBe(mockInput.plate)
    expect(result.color).toBe(mockInput.color)
    expect(result.brand).toBe(mockInput.brand)
  })

  // Teste para garantir que o método create do repositório seja chamado com os dados corretos
  it('should call repository create method with correct data', async () => {
    // Arrange
    const createCarUseCase = new CreateCarUseCase(mockRepository)

    // Act
    await createCarUseCase.execute(mockInput)

    // Assert
    expect(mockRepository.create).toHaveBeenCalledWith(expect.any(Car))
  })
})
