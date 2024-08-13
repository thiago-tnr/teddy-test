import { inject, injectable } from 'tsyringe'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { NotFoundError } from '../../../shared/erros/not-found-error.er'
import { type ShortUrl } from '../../../domain/entities/url.entity'

export type UpdateUrlInput = {
  userId: string
  url: string
  newUrl: string
}

export type UpdateUrlOutPut = {
  originalUrl: string
}
@injectable()
export class UpdateUrlUseCase implements UseCase<UpdateUrlInput, UpdateUrlOutPut> {
  constructor (
    @inject('ShortUrlRepository')
    private readonly repository: Repository<ShortUrl>
  ) { }

  async execute ({ userId, url, newUrl }: UpdateUrlInput): Promise<UpdateUrlOutPut> {
    const findUrl = await this.repository.findByUser({ userId, url })

    if (!findUrl) throw new NotFoundError()

    newUrl && findUrl!.changeOriginalUrl(newUrl)

    await this.repository.update(findUrl)

    return {
      originalUrl: findUrl!.originalUrl
    }
  }
}
