import { CreateExpenseController, FindExpenseController, UpdateExpenseController, DeleteExpenseController } from '../../../application/controllers/expense'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { container } from 'tsyringe'

// Create Expense
container.register<Controller>('CreateExpenseController', CreateExpenseController)

// Find Expense
container.register<Controller>('FindExpenseController', FindExpenseController)

// Update Expense
container.register<Controller>('UpdateExpenseController', UpdateExpenseController)

// Delete Expense
container.register<Controller>('DeleteExpenseController', DeleteExpenseController)
