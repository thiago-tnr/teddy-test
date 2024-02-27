export class Repository<T> {
  create!: (entity: T) => Promise<void>
  update!: (entity: T) => Promise<void>
  find!: (entity_id: string) => Promise<T | null>
  delete!: (entity_id: string) => Promise<void>
}
