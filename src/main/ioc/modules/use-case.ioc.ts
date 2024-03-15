import { type CreateCarInput, type CreateCarOutPut, CreateCarUseCase, type FindCarInput, type FindCarOutPut, FindCarUseCase, type UpdateCarInput, type UpdateCarOutPut, UpdateCarUseCase, type DeleteCarInput, type DeleteCarOutPut, DeleteCarUseCase } from '../../../application/use-case/car'
import { type FindAllCarsInput, type FindAllCarsOutPut, FindAllCarsUseCase } from '../../../application/use-case/car/find-all-car-use-case'
import { type CreateCarUsageInput, type CreateCarUsageOutPut, CreateCarUsageUseCase, type FindCarUsageOutPut, FindCarUsageUseCase, type UpdateCarUsageInput, type UpdateCarUsageOutPut, UpdateCarUsageUseCase } from '../../../application/use-case/usage'
import { type CreateUserInput, type CreateUserOutPut, CreateUserUseCase, type FindUserInput, type FindUserOutPut, FindUserUseCase, type UpdateUserInput, type UpdateUserOutPut, UpdateUserUseCase, type DeleteUserInput, type DeleteUserOutPut, DeleteUserUseCase, type FindAllUserInput, type FindAllUserOutPut, FindAllUserUseCase } from '../../../application/use-case/user'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { container } from 'tsyringe'

// Create Car
container.register<UseCase<CreateCarInput, CreateCarOutPut>>('CreateCarUseCase', CreateCarUseCase)
// Find Car
container.register<UseCase<FindCarInput, FindCarOutPut>>('FindCarUseCase', FindCarUseCase)
// Find Car
container.register<UseCase<FindAllCarsInput, FindAllCarsOutPut[]>>('FindAllCarsUseCase', FindAllCarsUseCase)
// Update Car
container.register<UseCase<UpdateCarInput, UpdateCarOutPut>>('UpdateCarUseCase', UpdateCarUseCase)
// Delete Car
container.register<UseCase<DeleteCarInput, DeleteCarOutPut>>('DeleteCarUseCase', DeleteCarUseCase)

// User Containers

// Create User
container.register<UseCase<CreateUserInput, CreateUserOutPut>>('CreateUserUseCase', CreateUserUseCase)
// Find User
container.register<UseCase<FindUserInput, FindUserOutPut>>('FindUserUseCase', FindUserUseCase)
// Find User
container.register<UseCase<FindAllUserInput, FindAllUserOutPut[]>>('FindAllUserUseCase', FindAllUserUseCase)
// Update User
container.register<UseCase<UpdateUserInput, UpdateUserOutPut>>('UpdateUserUseCase', UpdateUserUseCase)
// Delete User
container.register<UseCase<DeleteUserInput, DeleteUserOutPut>>('DeleteUserUseCase', DeleteUserUseCase)

// Car Usage Containers

// Create User
container.register<UseCase<CreateCarUsageInput, CreateCarUsageOutPut>>('CreateCarUsageUseCase', CreateCarUsageUseCase)
// Find CarUsage
container.register<UseCase<any, FindCarUsageOutPut[]>>('FindCarUsageUseCase', FindCarUsageUseCase)
// Update CarUsage
container.register<UseCase<UpdateCarUsageInput, UpdateCarUsageOutPut>>('UpdateCarUsageUseCase', UpdateCarUsageUseCase)
