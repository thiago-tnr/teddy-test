export class Repository<T> {
  create!: (entity: T) => Promise<void>
  update!: (entity: T) => Promise<void>
  find!: (entity_id: string) => Promise<T | null>
  findByEmail!: (input: any) => Promise<T | null>
  findByUser!: (input: any) => Promise<T | null>
  delete!: (entity_id: string, input?: string) => Promise<void>
  findAll!: (input?: string) => Promise<T[] | null>
}
