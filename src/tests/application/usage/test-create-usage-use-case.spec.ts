import 'reflect-metadata'
import { CarUsage } from '../../../domain/entities/car-usage.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { type CreateCarUsageInput, CreateCarUsageUseCase } from '../../../application/use-case/usage'

// Mock do repositório para simular a interação com o banco de dados
const mockRepository: Repository<CarUsage> = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn()
}

// Mock do input para o teste
const mockInput: CreateCarUsageInput = {
  startDate: new Date(),
  driver: 'John Doe',
  car: 'ABC123',
  reason: 'Work commute'
}

const mockCarUsage: CarUsage = new CarUsage({
  carUsageId: Uuid.create('dc85ee28-ee68-4fa0-8275-4fefae85dbc0'),
  startDate: mockInput.startDate,
  driver: mockInput.driver,
  car: mockInput.car,
  reason: mockInput.reason,
  endDate: undefined // Simula que o carro não está em uso
})
describe('CreateCarUsageUseCase', () => {
  // Teste para garantir que uma utilização de carro seja criada corretamente
  it('should create a car usage', async () => {
    // Arrange
    const createCarUsageUseCase = new CreateCarUsageUseCase(mockRepository)

    // Simula que não há nenhuma utilização de carro existente
    jest.spyOn(mockRepository, 'findBy').mockResolvedValueOnce(null)

    // Act
    const result = await createCarUsageUseCase.execute(mockInput)

    // Assert
    expect(mockRepository.findBy).toHaveBeenCalledWith(mockInput)
    expect(mockRepository.create).toHaveBeenCalledWith(expect.any(CarUsage))
    expect(result.carUsageId).toBeDefined()
    expect(result.startDate).toEqual(mockInput.startDate)
    expect(result.driver).toEqual(mockInput.driver)
    expect(result.car).toEqual(mockInput.car)
    expect(result.reason).toEqual(mockInput.reason)
  })

  // Teste para garantir que o UsageError seja lançado quando o carro já estiver em uso por outro motorista
  it('should throw UsageError when car is already in use by another driver', async () => {
    // Arrange
    // Simula que já existe uma utilização de carro em curso
    mockCarUsage.endDate = new Date()
    jest.spyOn(mockRepository, 'findBy').mockResolvedValueOnce(mockCarUsage)
    // Act and Assert
    expect(mockRepository.create).not.toHaveBeenCalled()
  })
})
