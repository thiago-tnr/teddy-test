/* eslint-disable @typescript-eslint/consistent-type-assertions */
import 'reflect-metadata'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type ShortUrl } from '../../../domain/entities/url.entity'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { FindAllUrlUseCase, type FindAllUrlInput, type FindAllUrlOutPut } from '../../../application/use-case/shorted/find-all-short-url-use-case'

const repositoryMock: Partial<Repository<ShortUrl>> = {
  findAll: jest.fn()
}

describe('FindAllUrlUseCase', () => {
  let findAllUrlUseCase: FindAllUrlUseCase

  beforeEach(() => {
    findAllUrlUseCase = new FindAllUrlUseCase(repositoryMock as Repository<ShortUrl>)
  })

  it('should return all URLs and clicks for a user', async () => {
    const input: FindAllUrlInput = { userId: 'user-id' }
    const shortUrls: ShortUrl[] = [
      { originalUrl: 'http://example.com/1', clicks: 10, shortUrl: 'short1', userId: 'user-id' } as ShortUrl,
      { originalUrl: 'http://example.com/2', clicks: 5, shortUrl: 'short2', userId: 'user-id' } as ShortUrl
    ]

    jest.spyOn(repositoryMock, 'findAll').mockResolvedValue(shortUrls)

    const result: FindAllUrlOutPut[] = await findAllUrlUseCase.execute(input)

    expect(result).toEqual([
      { originalUrl: 'http://example.com/1', clicks: 10 },
      { originalUrl: 'http://example.com/2', clicks: 5 }
    ])
    expect(repositoryMock.findAll).toHaveBeenCalledWith(input.userId)
  })

  it('should throw NotFoundError if no URLs are found', async () => {
    const input: FindAllUrlInput = { userId: 'user-id' }

    jest.spyOn(repositoryMock, 'findAll').mockResolvedValue(null)

    await expect(findAllUrlUseCase.execute(input)).rejects.toThrow(NotFoundError)
    expect(repositoryMock.findAll).toHaveBeenCalledWith(input.userId)
  })
})
