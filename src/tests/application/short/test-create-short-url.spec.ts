import 'reflect-metadata'
import shortid from 'shortid'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { ShortUrl } from '../../../domain/entities/url.entity'
import { type ShortUrlInput, type ShortUrlOutput } from '../../../application/controllers/shorted/create-short-url-controller'
import { ShortUrlUseCase } from '../../../application/use-case/shorted/create-short-url-use-case'

const repositoryMock: Partial<Repository<ShortUrl>> = {
  create: jest.fn()
}

jest.mock('shortid', () => ({
  generate: jest.fn()
}))

describe('ShortUrlUseCase', () => {
  let shortUrlUseCase: ShortUrlUseCase

  beforeEach(() => {
    shortUrlUseCase = new ShortUrlUseCase(repositoryMock as Repository<ShortUrl>)
  })

  it('should generate a short URL and save it', async () => {
    const input: ShortUrlInput = { url: 'http://example.com', userId: 'user-id' }
    const generatedShortId = 'abc1234' // Short ID mock value

    jest.spyOn(shortid, 'generate').mockReturnValue(generatedShortId)

    const shortUrl = ShortUrl.create({
      originalUrl: input.url,
      shortUrl: generatedShortId.substring(0, 6),
      clicks: 0,
      userId: input.userId
    })

    jest.spyOn(ShortUrl, 'create').mockReturnValue(shortUrl)
    jest.spyOn(repositoryMock, 'create').mockResolvedValue(undefined)

    const result: ShortUrlOutput = await shortUrlUseCase.execute(input)

    expect(result).toEqual({ shortUrl: `http://localhost:3000/${generatedShortId.substring(0, 6)}` })
    expect(shortid.generate).toHaveBeenCalled()
    expect(repositoryMock.create).toHaveBeenCalledWith(shortUrl)
  })

  it('should handle missing userId correctly', async () => {
    const input: ShortUrlInput = { url: 'http://example.com' }
    const generatedShortId = 'xyz7890' // Short ID mock value

    jest.spyOn(shortid, 'generate').mockReturnValue(generatedShortId)

    const shortUrl = ShortUrl.create({
      originalUrl: input.url,
      shortUrl: generatedShortId.substring(0, 6),
      clicks: 0,
      userId: undefined
    })

    jest.spyOn(ShortUrl, 'create').mockReturnValue(shortUrl)
    jest.spyOn(repositoryMock, 'create').mockResolvedValue(undefined)

    const result: ShortUrlOutput = await shortUrlUseCase.execute(input)

    expect(result).toEqual({ shortUrl: `http://localhost:3000/${generatedShortId.substring(0, 6)}` })
    expect(shortid.generate).toHaveBeenCalled()
    expect(repositoryMock.create).toHaveBeenCalledWith(shortUrl)
  })
})
