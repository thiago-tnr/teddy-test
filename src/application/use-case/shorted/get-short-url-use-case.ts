import { inject, injectable } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { type ShortUrl } from '../../../domain/entities/url.entity'

export type GetUrlInput = {
  shortUrl: string
}

export type GetUrlOutPut = {
  originalUrl: string
}
@injectable()
export class GetUrlUseCase implements UseCase<GetUrlInput, GetUrlOutPut> {
  constructor (
    @inject('ShortUrlRepository')
    private readonly repository: Repository<ShortUrl>
  ) { }

  async execute (input: GetUrlInput): Promise<GetUrlOutPut> {
    const shortUrl = await this.repository.find(input.shortUrl)

    if (!shortUrl) throw new NotFoundError()

    return {
      originalUrl: shortUrl.originalUrl
    }
  }
}
