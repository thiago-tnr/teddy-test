import { type CreateCarUsageProps, CarUsage } from '../../domain/entities/car-usage.entity'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'

describe('CarUsage', () => {
  it('should create a car usage entity', () => {
    // Arrange
    const mockProps: CreateCarUsageProps = {
      startDate: new Date('2024-03-15'),
      driver: 'John Doe',
      car: 'ABC123',
      reason: 'Work commute'
    }

    // Act
    const carUsage = CarUsage.create(mockProps)

    // Assert
    expect(carUsage.carUsageId).toBeInstanceOf(Uuid)
    expect(carUsage.startDate).toBe(mockProps.startDate)
    expect(carUsage.endDate).toBeUndefined()
    expect(carUsage.driver).toBe(mockProps.driver)
    expect(carUsage.car).toBe(mockProps.car)
    expect(carUsage.reason).toBe(mockProps.reason)
  })

  it('should throw EntityValidationError when creating a car usage with missing fields', () => {
    // Arrange
    const mockProps: CreateCarUsageProps = {
      startDate: new Date('2024-03-15'),
      driver: '',
      car: 'ABC123',
      reason: 'Work commute'
    }

    // Act and Assert
    expect(() => CarUsage.create(mockProps)).toThrow()
  })

  it('should end a car usage', () => {
    // Arrange
    const carUsage = new CarUsage({
      startDate: new Date('2024-03-15'),
      endDate: undefined,
      driver: 'John Doe',
      car: 'ABC123',
      reason: 'Work commute'
    })
    const endDate = new Date('2024-03-16')

    // Act
    carUsage.endUsage(endDate)

    // Assert
    expect(carUsage.endDate).toBe(endDate)
  })

  it('should check if the car usage is active', () => {
    // Arrange
    const activeCarUsage = new CarUsage({
      startDate: new Date('2024-03-15'),
      endDate: undefined,
      driver: 'John Doe',
      car: 'ABC123',
      reason: 'Work commute'
    })
    const inactiveCarUsage = new CarUsage({
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-03-16'),
      driver: 'John Doe',
      car: 'ABC123',
      reason: 'Work commute'
    })

    // Assert
    expect(activeCarUsage.isUsageActive()).toBe(true)
    expect(inactiveCarUsage.isUsageActive()).toBe(false)
  })

  it('should check if the car is in drive', () => {
    // Arrange
    const inDriveCarUsage = new CarUsage({
      startDate: new Date('2024-03-15'),
      endDate: undefined,
      driver: 'John Doe',
      car: 'ABC123',
      reason: 'Work commute'
    })
    const notInDriveCarUsage = new CarUsage({
      startDate: new Date('2024-03-15'),
      endDate: undefined,
      driver: '',
      car: 'ABC123',
      reason: 'Work commute'
    })

    // Assert
    expect(inDriveCarUsage.inDrive()).toBe(true)
    expect(notInDriveCarUsage.inDrive()).toBe(false)
  })
})
