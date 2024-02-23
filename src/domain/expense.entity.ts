import { Uuid } from '../shared/domain/value-objects/uuid.vo'

export type ExpenseProps = {
  expense_id?: Uuid
  description: string
  data?: Date
  user: any
  value: number
}

export type CreateExpenseProps = {
  description: string
  user: any
  value: number
}

export class Expense {
  expense_id: Uuid
  description: string
  data: Date
  user: AnalyserOptions
  value: number

  constructor (props: ExpenseProps) {
    this.expense_id = props.expense_id ?? Uuid.create()
    this.description = props.description
    this.data = props.data ?? new Date()
    this.user = props.user
    this.value = props.value
  }

  // factory method to create a new Expense
  static create (props: CreateExpenseProps): Expense {
    return new Expense(props)
  }

  changeDescription (description: string): void {
    this.description = description
  }

  changeValue (value: number): void {
    this.value = value
  }
}

// ● Id
// ● Descrição (descrição da despesa)
// ● Data (data de quando ocorreu a despesa)
// ● Usuário (usuário dono da despesa, um relacionamento com a tabela de Usuários)
// ● Valor (valor em reais da despesa)
