import { ValueObject } from './value-object';
import { v7 as uuid, validate } from 'uuid';

export class Uuid extends ValueObject {
  private readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id || uuid();
  }

  private validate() {
    const isValid = validate(this.id);
    console.log('isvalid ', isValid);

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
