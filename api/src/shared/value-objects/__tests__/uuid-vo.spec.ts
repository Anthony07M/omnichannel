import { v4 as idv4 } from 'uuid';
import { Uuid } from '../uuid.vo';

describe('Unit test Uuid Value Object', () => {
  it('should create email success', () => {
    const uuid = idv4();
    const id = new Uuid(uuid);

    expect(id.toString()).toEqual(uuid);
  });

  it('should throw Error invalid Uuid', () => {
    expect(() => {
      new Uuid('invalid id');
    }).toThrow('Id deve ser um UUID válido');
  });
});
