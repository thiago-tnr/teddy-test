import LoginUserUseCase, { type UserLoginInputUseCase, type UserLoginOutPutUseCase } from '../../../application/use-case/auth/user-use-case'
import { type ShortUrlInput, type ShortUrlOutput, ShortUrlUseCase } from '../../../application/use-case/shorted/create-short-url-use-case'
import { type DeleteShortUrlInput, type DeleteShortUrlOutPut, DeleteShortUrlUseCase } from '../../../application/use-case/shorted/delete-user-use-case'
import { FindAllUrlUseCase, type FindAllUrlInput, type FindAllUrlOutPut } from '../../../application/use-case/shorted/find-all-short-url-use-case'
import { type GetUrlInput, type GetUrlOutPut, GetUrlUseCase } from '../../../application/use-case/shorted/get-short-url-use-case'
import { type UpdateUrlInput, type UpdateUrlOutPut, UpdateUrlUseCase } from '../../../application/use-case/shorted/update-short-url-use-case'
import { type CreateUserInput, type CreateUserOutPut, CreateUserUseCase, type FindUserInput, type FindUserOutPut, FindUserUseCase, type UpdateUserInput, type UpdateUserOutPut, UpdateUserUseCase, type DeleteUserInput, type DeleteUserOutPut, DeleteUserUseCase } from '../../../application/use-case/user'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { container } from 'tsyringe'

// Create User
container.register<UseCase<CreateUserInput, CreateUserOutPut>>('CreateUserUseCase', CreateUserUseCase)
// Find User
container.register<UseCase<FindUserInput, FindUserOutPut>>('FindUserUseCase', FindUserUseCase)
// Update User
container.register<UseCase<UpdateUserInput, UpdateUserOutPut>>('UpdateUserUseCase', UpdateUserUseCase)
// Delete User
container.register<UseCase<DeleteUserInput, DeleteUserOutPut>>('DeleteUserUseCase', DeleteUserUseCase)

container.register<UseCase<UserLoginInputUseCase, UserLoginOutPutUseCase>>('LoginUserUseCase', LoginUserUseCase)

container.register<UseCase<ShortUrlInput, ShortUrlOutput>>('ShortUrlUseCase', ShortUrlUseCase)
container.register<UseCase<GetUrlInput, GetUrlOutPut>>('GetUrlUseCase', GetUrlUseCase)
container.register<UseCase<FindAllUrlInput, FindAllUrlOutPut>>('FindAllUrlUseCase', FindAllUrlUseCase)
container.register<UseCase<UpdateUrlInput, UpdateUrlOutPut>>('UpdateUrlUseCase', UpdateUrlUseCase)
container.register<UseCase<DeleteShortUrlInput, DeleteShortUrlOutPut>>('DeleteShortUrlUseCase', DeleteShortUrlUseCase)
