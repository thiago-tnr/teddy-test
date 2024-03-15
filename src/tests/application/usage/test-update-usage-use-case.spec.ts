import 'reflect-metadata'
import { CarUsage } from '../../../domain/entities/car-usage.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { UpdateCarUsageUseCase } from '../../../application/use-case/usage'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'

// Mock da instância de CarUsage
const mockCarUsage: CarUsage = new CarUsage({
  carUsageId: Uuid.create('dc85ee28-ee68-4fa0-8275-4fefae85dbc0'),
  startDate: new Date(),
  endDate: undefined,
  driver: 'John Doe',
  car: 'ABC123',
  reason: 'Work commute'
})

// Mock do repositório para simular a interação com o banco de dados
const mockCarUsageRepository: Repository<CarUsage> = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockResolvedValue(mockCarUsage),
  findBy: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn()
}

describe('UpdateCarUsageUseCase', () => {
  it('should update a car usage', async () => {
    // Arrange
    const updateCarUsageUseCase = new UpdateCarUsageUseCase(mockCarUsageRepository)
    const mockInput = {
      driver: 'John Doe',
      endDate: new Date('2024-03-15')
    }

    // Act
    const result = await updateCarUsageUseCase.execute(mockInput)

    // Assert
    expect(mockCarUsageRepository.find).toHaveBeenCalledWith(mockInput.driver)
    expect(mockCarUsageRepository.update).toHaveBeenCalledWith(mockCarUsage)
    expect(result.carUsageId).toBe(mockCarUsage.carUsageId.id)
    expect(result.startDate).toBe(mockCarUsage.startDate)
    expect(result.endDate).toBe(mockInput.endDate)
    expect(result.driver).toBe(mockCarUsage.driver)
    expect(result.car).toBe(mockCarUsage.car)
    expect(result.reason).toBe(mockCarUsage.reason)
  })

  it('should throw NotFoundError when car usage is not found', async () => {
    // Arrange
    jest.spyOn(mockCarUsageRepository, 'find').mockResolvedValueOnce(null)
    const updateCarUsageUseCase = new UpdateCarUsageUseCase(mockCarUsageRepository)
    const mockInput = {
      driver: 'John Doe',
      endDate: new Date('2024-03-15')
    }

    // Act and Assert
    await expect(updateCarUsageUseCase.execute(mockInput)).rejects.toThrow(NotFoundError)
    expect(mockCarUsageRepository.find).toHaveBeenCalledWith(mockInput.driver)
    expect(mockCarUsageRepository.update).not.toHaveBeenCalled()
  })
})
