import { inject, injectable } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { type ShortUrl } from '../../../domain/entities/url.entity'

export type FindAllUrlInput = {
  userId: string
}

export type FindAllUrlOutPut = {
  originalUrl: string
  clicks: number
}
@injectable()
export class FindAllUrlUseCase implements UseCase<FindAllUrlInput, FindAllUrlOutPut> {
  constructor (
    @inject('ShortUrlRepository')
    private readonly repository: Repository<ShortUrl>
  ) { }

  async execute (input: FindAllUrlInput): Promise<FindAllUrlOutPut> {
    const shortUrls = await this.repository.findAll(input.userId)

    if (!shortUrls) throw new NotFoundError()

    const data = shortUrls.map(shortUrl => ({
      originalUrl: shortUrl.originalUrl,
      clicks: shortUrl.clicks
    }))

    return data as unknown as FindAllUrlOutPut
  }
}
