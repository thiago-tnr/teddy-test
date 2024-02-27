import { CreateExpenseController } from '../../../application/expense/controllers/create-expense-controller'
import { DeleteExpenseController } from '../../../application/expense/controllers/delete-expense-controller'
import { FindExpenseController } from '../../../application/expense/controllers/find-expense-controller'
import { UpdateExpenseController } from '../../../application/expense/controllers/update-expense-controller'
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
