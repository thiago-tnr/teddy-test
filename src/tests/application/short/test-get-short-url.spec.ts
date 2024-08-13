/* eslint-disable @typescript-eslint/consistent-type-assertions */
import 'reflect-metadata'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type ShortUrl } from '../../../domain/entities/url.entity'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { GetUrlUseCase, type GetUrlInput, type GetUrlOutPut } from '../../../application/use-case/shorted/get-short-url-use-case'

// Mock da implementação do Repository
const repositoryMock: Partial<Repository<ShortUrl>> = {
  find: jest.fn()
}

describe('GetUrlUseCase', () => {
  let getUrlUseCase: GetUrlUseCase

  beforeEach(() => {
    getUrlUseCase = new GetUrlUseCase(repositoryMock as Repository<ShortUrl>)
  })

  it('should return the original URL when the short URL is found', async () => {
    // Arrange
    const input: GetUrlInput = { shortUrl: 'short123' }
    const originalUrl = 'http://example.com'
    const shortUrlData: ShortUrl = {
      shortUrl: input.shortUrl,
      originalUrl,
      clicks: 0,
      userId: 'user-id'
    } as ShortUrl

    jest.spyOn(repositoryMock, 'find').mockResolvedValue(shortUrlData)

    // Act
    const result: GetUrlOutPut = await getUrlUseCase.execute(input)

    // Assert
    expect(result).toEqual({ originalUrl })
    expect(repositoryMock.find).toHaveBeenCalledWith(input.shortUrl)
    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
  })

  it('should throw a NotFoundError when the short URL is not found', async () => {
    const input: GetUrlInput = { shortUrl: 'short123' }

    jest.spyOn(repositoryMock, 'find').mockResolvedValue(null)

    await expect(getUrlUseCase.execute(input)).rejects.toThrow(NotFoundError)
    expect(repositoryMock.find).toHaveBeenCalledWith(input.shortUrl)
    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
  })
})
