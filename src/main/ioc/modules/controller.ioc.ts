import { LoginUserController } from '../../../application/controllers/auth/user-controller'
import { ShortUrlController } from '../../../application/controllers/shorted/create-short-url-controller'
import { CreateUserController, DeleteUserController, FindUserController, UpdateUserController } from '../../../application/controllers/user'
import { container } from 'tsyringe'
import { type Controller } from '../../../shared/application/protocol/controller-interface'
import { GetUrlController } from '../../../application/controllers/shorted/get-short-url.controller'
import { FindAllUrlController } from '../../../application/controllers/shorted/find-all-short-url.controller'
import { UpdateUrlController } from '../../../application/controllers/shorted/update-short-url.controller'
import { DeleteShortUrlController } from '../../../application/controllers/shorted/delete-user-controller'

// User Containers

container.register<Controller>('CreateUserController', CreateUserController)
// Find User
container.register<Controller>('FindUserController', FindUserController)
// Update User
container.register<Controller>('UpdateUserController', UpdateUserController)
// Delete User
container.register<Controller>('DeleteUserController', DeleteUserController)

// User Login
container.register<Controller>('LoginUserController', LoginUserController)

container.register<Controller>('ShortUrlController', ShortUrlController)
container.register<Controller>('GetUrlController', GetUrlController)
container.register<Controller>('FindAllUrlController', FindAllUrlController)
container.register<Controller>('UpdateUrlController', UpdateUrlController)
container.register<Controller>('DeleteShortUrlController', DeleteShortUrlController)
