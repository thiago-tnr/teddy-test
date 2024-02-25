export class Repository<T> {
  create: (entity: T) => void
  update: (entity: T) => void
  find: (entity_id: string) => Promise<T | null>
  delete: (entity_id: string) => void
}
