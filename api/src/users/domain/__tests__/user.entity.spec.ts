import { Address } from 'src/shared/value-objects/address.vo';
import { User, UserContructorProps, UserId } from '../entities/user.entity';

describe('User entity unit test', () => {
  it('should create user success', () => {
    const props: UserContructorProps = {
      name: 'Jonh Doe',
      email: 'jonh@mail.com',
      address: Address.crete({
        cep: '69018-660',
        logradouro: 'Rua Macacaúba',
        complemento: '(Res V Melhor - 2ª Etapa)',
        bairro: 'Lago Azul',
        localidade: 'Manaus',
        uf: 'AM',
        estado: 'Amazonas',
        regiao: 'Norte',
      }),
    };

    const user = User.create(props);

    expect(user.name).toEqual('Jonh Doe');
    expect(user.email).toEqual('jonh@mail.com');
    expect(user.password).toEqual('');
    expect(user.id).toBeInstanceOf(UserId);
    expect(user).toBeInstanceOf(User);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
    expect(user.address).toEqual(props.address);
  });
});
