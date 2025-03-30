import { ValueObject } from './value-object';
import { v4 as uuid, validate } from 'uuid';

export class Uuid extends ValueObject {
  private readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id || uuid();
    this.validate();
  }

  private validate() {
    const isValid = validate(this.id);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }

  toString() {
    return this.id;
  }
}

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || 'Id deve ser um UUID válido');
    this.name = 'InvalidUuidError';
  }
}
