import { ValueObject } from '../value-objects/value-object';

export interface RepositoryInterface<T, ID extends ValueObject> {
  save(entity: T): Promise<void>;
  findById(entityId: ID): Promise<T | null>;
}
