import { type CreateUserProps, User } from '../../domain/entities/user.entity'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'

describe('User', () => {
  it('should create a user entity', () => {
    // Arrange
    const mockProps: CreateUserProps = {
      name: 'John Doe'
    }

    // Act
    const user = User.create(mockProps)

    // Assert
    expect(user.user_id).toBeInstanceOf(Uuid)
    expect(user.name).toBe(mockProps.name)
  })

  it('should throw EntityValidationError when creating a user with missing name', () => {
    // Arrange
    const mockProps: CreateUserProps = {
      name: ''
    }

    // Act and Assert
    expect(() => User.create(mockProps)).toThrow()
  })

  it('should change the name of the user', () => {
    // Arrange
    const user = new User({
      user_id: Uuid.create(),
      name: 'John Doe'
    })
    const newName = 'Jane Doe'

    // Act
    user.changeName(newName)

    // Assert
    expect(user.name).toBe(newName)
  })

  it('should revalidate the user after changing the name', () => {
    // Arrange
    const user = new User({
      user_id: Uuid.create(),
      name: 'John Doe'
    })
    const newName = ''

    // Act and Assert
    expect(() => { user.changeName(newName) }).toThrow()
  })
})
