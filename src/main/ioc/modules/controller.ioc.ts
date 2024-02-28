import { CreateExpenseController, FindExpenseController, UpdateExpenseController, DeleteExpenseController } from '../../../application/controllers/expense'
import { CreateUserController, FindUserController, UpdateUserController, DeleteUserController, LoginUserController } from '../../../application/controllers/user'

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

// User Containers

// Create Expense
container.register<Controller>('CreateUserController', CreateUserController)
// Find User
container.register<Controller>('FindUserController', FindUserController)
// Update User
container.register<Controller>('UpdateUserController', UpdateUserController)
// Delete User
container.register<Controller>('DeleteUserController', DeleteUserController)
// Login User
container.register<Controller>('LoginUserController', LoginUserController)
