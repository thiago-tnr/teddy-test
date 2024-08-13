import { Entity } from '../../shared/domain/protocol/entity-interface'
import { type ValueObject } from '../../shared/domain/value-object'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'

export type UrlProps = {
  urlId?: Uuid
  originalUrl: string
  shortUrl: string
  clicks: number
  userId?: string
}

export type CreateUrlProps = {
  originalUrl: string
  shortUrl: string
  clicks: number
  userId?: string
}

export class ShortUrl extends Entity {
  urlId: Uuid
  originalUrl: string
  shortUrl: string
  clicks: number
  userId?: string

  constructor (input: UrlProps) {
    super()
    this.urlId = input.urlId ?? Uuid.create()
    this.originalUrl = input.originalUrl
    this.shortUrl = input.shortUrl
    this.clicks = input.clicks
    this.userId = input.userId
  }

  get entity_id (): ValueObject {
    throw new Error('Method not implemented.')
  }

  static create (props: CreateUrlProps): ShortUrl {
    const url = new ShortUrl(props)
    ShortUrl.validate(url)
    return url
  }

  changeOriginalUrl (original_url: string): void {
    this.originalUrl = original_url
    ShortUrl.validate(this)
  }

  changeShortUrl (short_url: string): void {
    this.shortUrl = short_url
    ShortUrl.validate(this)
  }

  incrementClicks (): void {
    this.clicks += 1
    ShortUrl.validate(this)
  }

  static validate (entity: ShortUrl): any {
    if (!entity.originalUrl) {
      console.error('Original URL is required')
    }
    if (!entity.shortUrl) {
      console.error('Short URL is required')
    }
  }
}
