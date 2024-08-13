/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type ShortUrl } from '../../../domain/entities/url.entity'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { UpdateUrlUseCase, type UpdateUrlInput, type UpdateUrlOutPut } from '../../../application/use-case/shorted/update-short-url-use-case'

// Mock da implementação do Repository
const repositoryMock: Partial<Repository<ShortUrl>> = {
  findByUser: jest.fn(),
  update: jest.fn()
}

describe('UpdateUrlUseCase', () => {
  let updateUrlUseCase: UpdateUrlUseCase

  beforeEach(() => {
    updateUrlUseCase = new UpdateUrlUseCase(repositoryMock as Repository<ShortUrl>)
  })

  it('should update the URL and return the new URL', async () => {
    // Arrange
    const input: UpdateUrlInput = { userId: 'user-id', url: 'http://example.com/old', newUrl: 'http://example.com/new' }
    const existingShortUrl = {
      originalUrl: 'http://example.com/old',
      changeOriginalUrl: jest.fn(function (this: any, newUrl: string) {
        this.originalUrl = newUrl
      })
    } as unknown as ShortUrl

    // Mock findByUser to return an existing ShortUrl
    jest.spyOn(repositoryMock, 'findByUser').mockResolvedValue(existingShortUrl)
    jest.spyOn(repositoryMock, 'update').mockResolvedValue(undefined)

    // Act
    const result: UpdateUrlOutPut = await updateUrlUseCase.execute(input)

    // Assert
    expect(result).toEqual({ originalUrl: 'http://example.com/new' })
    expect(repositoryMock.findByUser).toHaveBeenCalledWith({ userId: input.userId, url: input.url })
    expect(existingShortUrl.changeOriginalUrl).toHaveBeenCalledWith(input.newUrl)
    expect(repositoryMock.update).toHaveBeenCalledWith(existingShortUrl)
  })

  it('should throw NotFoundError if the URL is not found', async () => {
    // Arrange
    const input: UpdateUrlInput = { userId: 'user-id', url: 'http://example.com/old', newUrl: 'http://example.com/new' }

    // Mock findByUser to return null
    jest.spyOn(repositoryMock, 'findByUser').mockResolvedValue(null)

    // Act & Assert
    await expect(updateUrlUseCase.execute(input)).rejects.toThrow(NotFoundError)
    expect(repositoryMock.findByUser).toHaveBeenCalledWith({ userId: input.userId, url: input.url })
    expect(repositoryMock.update).not.toHaveBeenCalled()
  })
})
