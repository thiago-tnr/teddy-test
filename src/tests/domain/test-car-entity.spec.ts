import { Car } from '../../domain/entities/car.entity'

describe('Car', () => {
  describe('create', () => {
    it('should create a valid car', () => {
      // Arrange
      const carProps = {
        plate: 'ABC1234',
        color: 'Blue',
        brand: 'Toyota'
      }

      // Act
      const car = Car.create(carProps)

      // Assert
      expect(car).toBeInstanceOf(Car)
      expect(car.plate).toBe(carProps.plate)
      expect(car.color).toBe(carProps.color)
      expect(car.brand).toBe(carProps.brand)
    })

    it('should throw an EntityValidationError when creating an invalid car', () => {
      // Arrange
      const carProps = {
        plate: 'AB',
        color: 'Blue',
        brand: 'Toyota'
      }

      // Act and Assert
      expect(() => Car.create(carProps)).toThrow()
    })
  })

  describe('changeBrand', () => {
    it('should change the brand of the car', () => {
      // Arrange
      const carProps = {
        plate: 'ABC1235',
        color: 'Blue',
        brand: 'Toyota'
      }
      const newBrand = 'Honda'
      const car = Car.create(carProps)

      // Act
      car.changeBrand(newBrand)

      // Assert
      expect(car.brand).toBe(newBrand)
    })
  })
})
