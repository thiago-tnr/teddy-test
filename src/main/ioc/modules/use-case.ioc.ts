import { type UseCase } from '../../../shared/application/protocol/use-case-interface'
import { type CreateExpenseInput, type CreateExpenseOutPut, CreateExpenseUseCase } from '../../../application/expense/use-case/create-expense-use-case'
import { container } from 'tsyringe'
import { type FindExpenseInput, type FindExpenseOutPut, FindExpenseUseCase } from '../../../application/expense/use-case/find-expense-use-case'
import { type UpdateExpenseInput, type UpdateExpenseOutPut, UpdateExpenseUseCase } from '../../../application/expense/use-case/update-expense-use-case'
import { type DeleteExpenseInput, type DeleteExpenseOutPut, DeleteExpenseUseCase } from '../../../application/expense/use-case/delete-expense-use-case'

// Create Expense
container.register<UseCase<CreateExpenseInput, CreateExpenseOutPut>>('CreateExpenseUseCase', CreateExpenseUseCase)

// Find Expense
container.register<UseCase<FindExpenseInput, FindExpenseOutPut>>('FindExpenseUseCase', FindExpenseUseCase)

// Update Expense
container.register<UseCase<UpdateExpenseInput, UpdateExpenseOutPut>>('UpdateExpenseUseCase', UpdateExpenseUseCase)

// Delete Expense
container.register<UseCase<DeleteExpenseInput, DeleteExpenseOutPut>>('DeleteExpenseUseCase', DeleteExpenseUseCase)
