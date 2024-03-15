import 'reflect-metadata'
import { CarUsage } from '../../../domain/entities/car-usage.entity'
import { Car } from '../../../domain/entities/car.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { FindCarUsageUseCase } from '../../../application/use-case/usage'

// Mock das instâncias de CarUsage e Car
const mockCarUsage: CarUsage[] = [
  new CarUsage({
    carUsageId: Uuid.create('dc85ee28-ee68-4fa0-8275-4fefae85dbc0'),
    startDate: new Date(),
    endDate: new Date(),
    driver: 'John Doe',
    car: 'ABC123',
    reason: 'Work commute'
  })
]

const mockCar: Car = new Car({
  plate: 'ABC123',
  color: 'Blue',
  brand: 'Toyota'
})

// Mock do repositório para simular a interação com o banco de dados
const mockCarUsageRepository: Repository<CarUsage> = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn().mockResolvedValue(mockCarUsage)
}

const mockCarRepository: Repository<Car> = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockResolvedValue(mockCar),
  findBy: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn()
}

describe('FindCarUsageUseCase', () => {
  it('should return an array of car usages with car details', async () => {
    // Arrange
    const findCarUsageUseCase = new FindCarUsageUseCase(mockCarUsageRepository, mockCarRepository)

    // Act
    const result = await findCarUsageUseCase.execute({})

    // Assert
    expect(mockCarUsageRepository.findAll).toHaveBeenCalled()
    expect(mockCarRepository.find).toHaveBeenCalledWith(mockCarUsage[0].car)
    expect(result).toHaveLength(1)
    expect(result[0].car).toEqual({
      plate: mockCar.plate,
      color: mockCar.color,
      brand: mockCar.brand
    })
  })
})
