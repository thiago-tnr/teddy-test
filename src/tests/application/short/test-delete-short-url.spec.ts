import 'reflect-metadata'
import { type Repository } from '../../../infra/protocols/repository-interface'
import { type ShortUrl } from '../../../domain/entities/url.entity'
import { DeleteShortUrlUseCase, type DeleteShortUrlInput } from '../../../application/use-case/shorted/delete-user-use-case'

const repositoryMock: Partial<Repository<ShortUrl>> = {
  delete: jest.fn()
}

describe('DeleteShortUrlUseCase', () => {
  let deleteShortUrlUseCase: DeleteShortUrlUseCase

  beforeEach(() => {
    deleteShortUrlUseCase = new DeleteShortUrlUseCase(repositoryMock as Repository<ShortUrl>)
  })

  it('should call the delete method of the repository with the correct parameters', async () => {
    const input: DeleteShortUrlInput = { shortUrl: 'short-url-to-delete', userId: 'user-id' }
    await deleteShortUrlUseCase.execute(input)
    expect(repositoryMock.delete).toHaveBeenCalledWith(input.shortUrl, input.userId)
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1)
  })

  it('should handle errors from the repository delete method', async () => {
    const input: DeleteShortUrlInput = { shortUrl: 'short-url-to-delete', userId: 'user-id' }
    const error = new Error('Delete operation failed')
    jest.spyOn(repositoryMock, 'delete').mockRejectedValue(error)
    await expect(deleteShortUrlUseCase.execute(input)).rejects.toThrow(error)
    expect(repositoryMock.delete).toHaveBeenCalledWith(input.shortUrl, input.userId)
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1)
  })
})
