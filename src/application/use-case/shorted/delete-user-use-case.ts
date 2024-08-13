import { inject, injectable } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { type ShortUrl } from '../../../domain/entities/url.entity'

export type DeleteShortUrlInput = {
  shortUrl: string
  userId: string
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type DeleteShortUrlOutPut = void
@injectable()
export class DeleteShortUrlUseCase implements UseCase<DeleteShortUrlInput, DeleteShortUrlOutPut> {
  constructor (
    @inject('ShortUrlRepository')
    private readonly repository: Repository<ShortUrl>
  ) { }

  async execute ({ shortUrl, userId }: DeleteShortUrlInput): Promise<DeleteShortUrlOutPut> {
    await this.repository.delete(shortUrl, userId)
  }
}
