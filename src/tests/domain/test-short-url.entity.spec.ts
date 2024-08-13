import { ShortUrl, type CreateUrlProps } from '../../domain/entities/url.entity'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'

describe('ShortUrl', () => {
  it('should create an instance with default URL ID if not provided', () => {
    const props: CreateUrlProps = {
      originalUrl: 'http://example.com',
      shortUrl: 'short123',
      clicks: 0
    }

    const shortUrl = ShortUrl.create(props)

    expect(shortUrl).toBeInstanceOf(ShortUrl)
    expect(shortUrl.originalUrl).toBe(props.originalUrl)
    expect(shortUrl.shortUrl).toBe(props.shortUrl)
    expect(shortUrl.clicks).toBe(props.clicks)
    expect(shortUrl.urlId).toBeInstanceOf(Uuid)
  })

  it('should use provided URL ID if supplied', () => {
    const urlId = Uuid.create()
    const props: CreateUrlProps = {
      originalUrl: 'http://example.com',
      shortUrl: 'short123',
      clicks: 0,
      userId: 'user-id'
    }

    const shortUrl = ShortUrl.create({ ...props, urlId })

    expect(shortUrl.urlId).toBe(urlId)
  })

  it('should update the original URL and validate the instance', () => {
    const props: CreateUrlProps = {
      originalUrl: 'http://example.com',
      shortUrl: 'short123',
      clicks: 0
    }

    const shortUrl = ShortUrl.create(props)
    shortUrl.changeOriginalUrl('http://new-url.com')

    expect(shortUrl.originalUrl).toBe('http://new-url.com')
  })

  it('should update the short URL and validate the instance', () => {
    const props: CreateUrlProps = {
      originalUrl: 'http://example.com',
      shortUrl: 'short123',
      clicks: 0
    }

    const shortUrl = ShortUrl.create(props)
    shortUrl.changeShortUrl('short456')

    expect(shortUrl.shortUrl).toBe('short456')
  })

  it('should increment the click count and validate the instance', () => {
    const props: CreateUrlProps = {
      originalUrl: 'http://example.com',
      shortUrl: 'short123',
      clicks: 0
    }

    const shortUrl = ShortUrl.create(props)
    shortUrl.incrementClicks()

    expect(shortUrl.clicks).toBe(1)
  })

  it('should log error messages if validation fails', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const props: CreateUrlProps = {
      originalUrl: '',
      shortUrl: '',
      clicks: 0
    }

    ShortUrl.create(props) // This should call validate and log errors

    expect(consoleSpy).toHaveBeenCalledWith('Original URL is required')
    expect(consoleSpy).toHaveBeenCalledWith('Short URL is required')

    consoleSpy.mockRestore()
  })
})
