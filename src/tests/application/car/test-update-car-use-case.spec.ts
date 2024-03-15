import 'reflect-metadata'
import { UpdateCarUseCase, type UpdateCarInput } from '../../../application/use-case/car'
import { Car } from '../../../domain/entities/car.entity'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'

describe('UpdateCarUseCase', () => {
  let mockCar: Car
  let mockInput: UpdateCarInput
  let mockRepository: Repository<Car>

  beforeEach(() => {
    mockCar = new Car({
      car_id: Uuid.create('fb2459ea-753a-45f5-a0e2-becc9eae26b2'),
      plate: 'ABC1234',
      color: 'Red',
      brand: 'Toyota'
    })

    mockInput = {
      car_id: 'fb2459ea-753a-45f5-a0e2-becc9eae26b2',
      plate: 'ABC1235',
      color: 'new_color',
      brand: 'new_brand'
    }

    mockRepository = {
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn().mockResolvedValueOnce(mockCar),
      findBy: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn()
    }
  })

  // Teste para garantir que o carro é atualizado corretamente
  it('should update a car', async () => {
    // Arrange
    const changePlateSpy = jest.spyOn(mockCar, 'changePlate')
    const changeBrandSpy = jest.spyOn(mockCar, 'changeBrand')
    const changeColorSpy = jest.spyOn(mockCar, 'changeColor')

    const updateCarUseCase = new UpdateCarUseCase(mockRepository)

    // Act
    const result = await updateCarUseCase.execute(mockInput)

    // Assert
    expect(result.Car_id).toBe(mockCar.car_id.id)
    expect(changePlateSpy).toHaveBeenCalledWith(mockInput.plate)
    expect(changeBrandSpy).toHaveBeenCalledWith(mockInput.brand)
    expect(changeColorSpy).toHaveBeenCalledWith(mockInput.color)
    expect(mockRepository.update).toHaveBeenCalledWith(mockCar)
  })

  // Teste para garantir que o NotFoundError é lançado quando o carro não é encontrado
  it('should throw NotFoundError when car is not found', async () => {
    // Arrange
    const mockInputFail = {
      car_id: '',
      plate: '',
      color: '',
      brand: ''
    }
    await mockRepository.find(mockInputFail.car_id)
    const updateCarUseCase = new UpdateCarUseCase(mockRepository)

    // Act and Assert
    await expect(updateCarUseCase.execute(mockInputFail)).rejects.toThrow()
  })
})
