/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { validateSync } from 'class-validator'
import { type FieldsErrors, type IValidatorFields } from './validator-fields-interface'

export abstract class ClassValidatorFields<PropsValidated> implements IValidatorFields<PropsValidated> {
  errors: FieldsErrors = {}
  validatedData!: PropsValidated

  constructor () {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.validatedData ?? undefined
  }

  validate (data: PropsValidated): boolean {
    const errors = validateSync(data as object)
    if (errors.length) {
      this.errors = {}
      for (const error of errors) {
        const field = error.property
        this.errors[field] = Object.values(error.constraints!)
      }
    } else {
      this.validatedData = data
    }
    return !errors.length
  }
}
