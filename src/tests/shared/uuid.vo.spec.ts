import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { InvalidUuidError } from '../../shared/erros/invalid-uuid-error.er'

describe('Uuid unit tests', () => {
  const validSpy = jest.spyOn(Uuid.prototype as any, 'validate')
  it('should throw error when uuid is invalid', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Uuid('Invalid-uuid')
    }).toThrow(new InvalidUuidError())
    expect(validSpy).toHaveBeenCalledTimes(1)
  })

  it('should create a valid uuid', () => {
    const uuid = new Uuid()
    expect(uuid.id).toBeDefined()
    expect(validSpy).toHaveBeenCalledTimes(1)
  })

  it('should accept a valid uuid', () => {
    const uuid = new Uuid('5a762860-3e58-44c1-b469-4c20f10a56b3')
    expect(uuid.id).toBe('5a762860-3e58-44c1-b469-4c20f10a56b3')
    expect(validSpy).toHaveBeenCalledTimes(1)
  })
})
