import { CreateCarController, FindCarController, UpdateCarController, DeleteCarController } from '../../../application/controllers/car'
import { FindAllCarsController } from '../../../application/controllers/car/find-all-car-controller'
import { CreateCarUsageController, FindCarUsageController, UpdateCarUsageController } from '../../../application/controllers/usage'
import { CreateUserController, FindUserController, UpdateUserController, DeleteUserController } from '../../../application/controllers/user'
import { FindAllUserController } from '../../../application/controllers/user/find-all-user-controller'

import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { container } from 'tsyringe'

// Create Car
container.register<Controller>('CreateCarController', CreateCarController)
// Find Car
container.register<Controller>('FindCarController', FindCarController)
// Find All Cars
container.register<Controller>('FindAllCarsController', FindAllCarsController)
// Update Car
container.register<Controller>('UpdateCarController', UpdateCarController)
// Delete Car
container.register<Controller>('DeleteCarController', DeleteCarController)

// User Containers

// Create Car
container.register<Controller>('CreateUserController', CreateUserController)
// Find User
container.register<Controller>('FindUserController', FindUserController)
// Find All Users
container.register<Controller>('FindAllUserController', FindAllUserController)
// Update User
container.register<Controller>('UpdateUserController', UpdateUserController)
// Delete User
container.register<Controller>('DeleteUserController', DeleteUserController)

// Car Usage Containers

// Create Car
container.register<Controller>('CreateCarUsageController', CreateCarUsageController)
// Find CarUsage
container.register<Controller>('FindCarUsageController', FindCarUsageController)
// Update CarUsage
container.register<Controller>('UpdateCarUsageController', UpdateCarUsageController)
