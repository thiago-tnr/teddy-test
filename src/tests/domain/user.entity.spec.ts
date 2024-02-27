import { type CreateUserProps, User } from '../../domain/entities/user.entity'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { EntityValidationError } from '../../shared/erros/validate-entity-error.er'
import { jest } from '@jest/globals'

describe('User Entity', () => {
  describe('constructor', () => {
    it('should create a new User with provided data', () => {
      const props: CreateUserProps = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
      }

      const user = User.create(props)

      expect(user.user_id).toBeInstanceOf(Uuid)
      expect(user.name).toBe(props.name)
      expect(user.email).toBe(props.email)
      expect(user.password).toBe(props.password)
    })

    it('should generate a new Uuid if user_id is not provided', () => {
      const props: CreateUserProps = {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: 'password456'
      }

      const user = User.create(props)

      expect(user.user_id).toBeInstanceOf(Uuid)
    })
  })

  describe('changeName', () => {
    it('should change the user name', () => {
      const user = User.create({
        name: 'Michael Smith',
        email: 'michaelsmith@example.com',
        password: 'password789'
      })

      const newName = 'New Name'
      user.changeName(newName)

      expect(user.name).toBe(newName)
    })

    it('should validate the new name on change', () => {
      const user = User.create({
        name: 'Alice Johnson',
        email: 'alicejohnson@example.com',
        password: 'password012'
      })

      jest.spyOn(User, 'validate').mockImplementation(() => {
        throw new EntityValidationError()
      })

      expect(() => { user.changeName('') }).toThrow(EntityValidationError)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(User.validate).toHaveBeenCalledWith(user) // Verify validation called
    })
  })
})
