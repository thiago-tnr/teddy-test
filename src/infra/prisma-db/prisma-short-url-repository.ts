import { type PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import { ShortUrl } from '../../domain/entities/url.entity'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { type Repository } from '../protocols/repository-interface'

@injectable()
export class ShortUrlRepository implements Repository<ShortUrl> {
  constructor (
    @inject('PrismaClient')
    private readonly prisma: PrismaClient
  ) { }

  private async checkIfDeleted (urlId: string): Promise<void> {
    const record = await this.prisma.shortUrl.findUnique({
      where: { url_id: urlId }
    })

    if (record?.deleted_at) {
      throw new Error('URL has been deleted')
    }
  }

  async create (entity: ShortUrl): Promise<void> {
    await this.prisma.shortUrl.create({
      data: {
        url_id: entity.urlId.id,
        original_url: entity.originalUrl,
        short_url: entity.shortUrl,
        clicks: entity.clicks,
        user_id: entity.userId,
        created_at: new Date()
      }
    })
  }

  async update (entity: ShortUrl): Promise<void> {
    await this.checkIfDeleted(entity.urlId.id)

    await this.prisma.shortUrl.update({
      where: { url_id: entity.urlId.id },
      data: {
        original_url: entity.originalUrl,
        updated_at: new Date()
      }
    })
  }

  async find (shortUrl: string): Promise<ShortUrl | null> {
    try {
      const record = await this.prisma.shortUrl.findFirst({
        where: { short_url: shortUrl }
      })

      if (!record) {
        return null
      }

      await this.checkIfDeleted(record.url_id)

      await this.prisma.shortUrl.update({
        where: { url_id: record.url_id },
        data: { clicks: { increment: 1 }, updated_at: new Date() }
      })

      return new ShortUrl({
        urlId: Uuid.create(record.url_id),
        originalUrl: record.original_url,
        shortUrl: record.short_url,
        clicks: record.clicks,
        userId: record.user_id || undefined
      })
    } catch (error) {
      console.error('Error finding short URL:', error)
      throw new Error('Database query failed')
    }
  }

  findByEmail (input: any): Promise<ShortUrl | null> {
    throw new Error('Method not implemented.')
  }

  async delete (shortUrl: string, userId?: string): Promise<void> {
    const record = await this.prisma.shortUrl.findFirst({
      where: {
        original_url: shortUrl

      }
    })
    if (!record || record.deleted_at !== null) {
      throw new Error('URL is already deleted or does not exist')
    }

    if (userId && record.user_id !== userId) {
      throw new Error('Unauthorized')
    }

    await this.prisma.shortUrl.update({
      where: { url_id: record.url_id },
      data: { deleted_at: new Date() }
    })
  }

  async findAll (input?: string): Promise<ShortUrl[] | null> {
    try {
      const records = await this.prisma.shortUrl.findMany({
        where: {
          AND: [
            {
              user_id: input!
            },
            {
              deleted_at: null
            }
          ]
        }
      })

      return records.map(r => new ShortUrl({
        urlId: Uuid.create(r.url_id),
        originalUrl: r.original_url,
        shortUrl: r.short_url,
        clicks: r.clicks,
        userId: r.user_id || undefined
      }))
    } catch (error) {
      console.error('Error finding short URL:', error)
      throw new Error('Database query failed')
    }
  }

  async findByUser (input: any): Promise<ShortUrl | null> {
    const data = await this.prisma.shortUrl.findFirst({
      where: {
        AND: [
          {
            original_url: input.url
          },
          {
            user_id: input.userId
          },
          {
            deleted_at: null
          }
        ]
      }
    })

    if (!data) return null

    return new ShortUrl({
      urlId: Uuid.create(data.url_id),
      originalUrl: data.original_url,
      shortUrl: data.short_url,
      clicks: data.clicks,
      userId: data.user_id!
    })
  }
}
