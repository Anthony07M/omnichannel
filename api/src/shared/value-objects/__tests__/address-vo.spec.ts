import { Address, AddressContructorProps } from '../address.vo';

describe('Address Value Object', () => {
  it('should create an Address instance with all properties', () => {
    const props: AddressContructorProps = {
      id: '1',
      cep: '12345-678',
      logradouro: 'Rua Teste',
      complemento: 'Apto 101',
      bairro: 'Centro',
      localidade: 'Cidade Teste',
      uf: 'SP',
      estado: 'São Paulo',
      regiao: 'Sudeste',
    };

    const address = Address.create(props);

    expect(address).toBeInstanceOf(Address);
    expect(address.id).toBe('1');
    expect(address.cep).toBe('12345-678');
    expect(address.logradouro).toBe('Rua Teste');
    expect(address.complemento).toBe('Apto 101');
    expect(address.bairro).toBe('Centro');
    expect(address.localidade).toBe('Cidade Teste');
    expect(address.uf).toBe('SP');
    expect(address.estado).toBe('São Paulo');
    expect(address.regiao).toBe('Sudeste');
  });

  it('should create an Address instance with default id when not provided', () => {
    const props: AddressContructorProps = {
      cep: '12345-678',
      logradouro: 'Rua Teste',
      complemento: 'Apto 101',
      bairro: 'Centro',
      localidade: 'Cidade Teste',
      uf: 'SP',
      estado: 'São Paulo',
      regiao: 'Sudeste',
    };

    const address = Address.create(props);

    expect(address.id).toBe('');
  });

  it('should return a string representation of the address', () => {
    const props: AddressContructorProps = {
      id: '1',
      cep: '12345-678',
      logradouro: 'Rua Teste',
      complemento: 'Apto 101',
      bairro: 'Centro',
      localidade: 'Cidade Teste',
      uf: 'SP',
      estado: 'São Paulo',
      regiao: 'Sudeste',
    };

    const address = Address.create(props);
    const addressString = address.toString();

    expect(addressString).toEqual({
      cep: '12345-678',
      logradouro: 'Rua Teste',
      complemento: 'Apto 101',
      bairro: 'Centro',
      localidade: 'Cidade Teste',
      uf: 'SP',
      estado: 'São Paulo',
      regiao: 'Sudeste',
    });
  });
});
