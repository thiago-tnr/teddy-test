import { type CreateExpenseInput, type CreateExpenseOutPut, CreateExpenseUseCase, type FindExpenseInput, type FindExpenseOutPut, FindExpenseUseCase, type UpdateExpenseInput, type UpdateExpenseOutPut, UpdateExpenseUseCase, type DeleteExpenseInput, type DeleteExpenseOutPut, DeleteExpenseUseCase } from '../../../application/use-case/expense'
import { type CreateUserInput, type CreateUserOutPut, CreateUserUseCase, type FindUserInput, type FindUserOutPut, FindUserUseCase, type UpdateUserInput, type UpdateUserOutPut, UpdateUserUseCase, type DeleteUserInput, type DeleteUserOutPut, DeleteUserUseCase } from '../../../application/use-case/user'
import LoginUserUseCase, { type LoginUserUseCaseInput, type LoginUserUseCaseOutPut } from '../../../application/use-case/user/login-user-use-case'
import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { container } from 'tsyringe'

// Create Expense
container.register<UseCase<CreateExpenseInput, CreateExpenseOutPut>>('CreateExpenseUseCase', CreateExpenseUseCase)
// Find Expense
container.register<UseCase<FindExpenseInput, FindExpenseOutPut>>('FindExpenseUseCase', FindExpenseUseCase)
// Update Expense
container.register<UseCase<UpdateExpenseInput, UpdateExpenseOutPut>>('UpdateExpenseUseCase', UpdateExpenseUseCase)
// Delete Expense
container.register<UseCase<DeleteExpenseInput, DeleteExpenseOutPut>>('DeleteExpenseUseCase', DeleteExpenseUseCase)

// User Containers

// Create User
container.register<UseCase<CreateUserInput, CreateUserOutPut>>('CreateUserUseCase', CreateUserUseCase)
// Find User
container.register<UseCase<FindUserInput, FindUserOutPut>>('FindUserUseCase', FindUserUseCase)
// Update User
container.register<UseCase<UpdateUserInput, UpdateUserOutPut>>('UpdateUserUseCase', UpdateUserUseCase)
// Delete User
container.register<UseCase<DeleteUserInput, DeleteUserOutPut>>('DeleteUserUseCase', DeleteUserUseCase)
// Login User
container.register<UseCase<LoginUserUseCaseInput, LoginUserUseCaseOutPut>>('LoginUserUseCase', LoginUserUseCase)
