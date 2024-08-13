import shortid from 'shortid'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { inject, injectable } from 'tsyringe'
import { Repository } from '../../../infra/protocols/repository-interface'
import { ShortUrl } from '../../../domain/entities/url.entity'

export type ShortUrlInput = {
  url: string
  userId?: string
}
export type ShortUrlOutput = {
  shortUrl: string
}
@injectable()
export class ShortUrlUseCase implements UseCase<ShortUrlInput, ShortUrlOutput> {
  constructor (
    @inject('ShortUrlRepository')
    private readonly repository: Repository<ShortUrl>
  ) {}

  async execute ({ url, userId }: ShortUrlInput): Promise<ShortUrlOutput> {
    const shortId = shortid.generate()
    const shortUrl = shortId.substring(0, 6)

    const urlData = ShortUrl.create({ originalUrl: url, shortUrl, clicks: 0, userId })
    await this.repository.create(urlData)

    return { shortUrl: `http://localhost:3000/${shortUrl}` }
  }
}
