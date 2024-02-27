/* eslint-disable @typescript-eslint/no-var-requires */
import * as containerController from './controller.ioc'
import * as containerRepository from './repository.ioc'
import * as containerUseCase from './use-case.ioc'

// Exporta todos os containers como um objeto
module.exports = {
  containerController,
  containerRepository,
  containerUseCase
}
