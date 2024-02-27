import { type CreateExpenseInput, type CreateExpenseOutPut, CreateExpenseUseCase, type FindExpenseInput, type FindExpenseOutPut, FindExpenseUseCase, type UpdateExpenseInput, type UpdateExpenseOutPut, UpdateExpenseUseCase, type DeleteExpenseInput, type DeleteExpenseOutPut, DeleteExpenseUseCase } from '../../../application/use-case/expense'
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
