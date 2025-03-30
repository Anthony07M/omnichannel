import { UserRepositoryInterface } from 'src/users/domain/repositories/user.repository';
import { CreateUserUseCase } from '../create-user.usecase';
import { CreateUserDto } from 'src/users/application/dtos/create-user.dto';
import { Address } from 'src/shared/value-objects/address.vo';
import { UserId } from 'src/users/domain/entities/user.entity';

describe('CreateUserUseCase', () => {
  let userRepository: UserRepositoryInterface;
  const userRepositoryMock = {
    save: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
  };

  beforeEach(() => {
    userRepository = jest.mocked<UserRepositoryInterface>(userRepositoryMock);
  });

  it('should be create user success', async () => {
    const useCase = new CreateUserUseCase(userRepository);
    const createUserDto: CreateUserDto = {
      name: 'Jonh Doe',
      email: 'jonh@mail.com',
      password: '123456',
      address: {
        bairro: 'Lago Azul',
        cep: '69018-660',
        complemento: '(Res V Melhor - 2ª Etapa)',
        estado: 'Amazonas',
        logradouro: 'Rua Macacaúba',
        localidade: 'Manaus',
        regiao: 'Norte',
        uf: 'AM',
      },
    };

    const user = await useCase.execute(createUserDto);
    const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail');

    expect(findByEmailSpy).toHaveBeenCalledWith(createUserDto.email);

    expect(user.id).toBeDefined();
    expect(user.name).toEqual(createUserDto.name);
    expect(user.email).toEqual(createUserDto.email);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);

    expect(user.address.cep).toEqual(createUserDto.address.cep);
    expect(user.address.logradouro).toEqual(createUserDto.address.logradouro);
    expect(user.address.complemento).toEqual(createUserDto.address.complemento);
    expect(user.address.bairro).toEqual(createUserDto.address.bairro);
    expect(user.address.localidade).toEqual(createUserDto.address.localidade);
    expect(user.address.uf).toEqual(createUserDto.address.uf);
    expect(user.address.estado).toEqual(createUserDto.address.estado);
    expect(user.address.regiao).toEqual(createUserDto.address.regiao);
  });

  it('should be throw ConflictException when user already exists', () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      id: new UserId('0195e843-9971-74ce-81c2-88e97c36daa8'),
      name: 'Jonh Doe',
      email: 'jonh@mail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      address: Address.create({
        bairro: 'Lago Azul',
        cep: '69018-660',
        complemento: '(Res V Melhor - 2ª Etapa)',
        estado: 'Amazonas',
        logradouro: 'Rua Macacaúba',
        localidade: 'Manaus',
        regiao: 'Norte',
        uf: 'AM',
      }),
    });

    const createUserDto: CreateUserDto = {
      name: 'Jonh Doe',
      email: 'jonh@mail.com',
      password: '123456',
      address: {
        bairro: 'Lago Azul',
        cep: '69018-660',
        complemento: '(Res V Melhor - 2ª Etapa)',
        estado: 'Amazonas',
        logradouro: 'Rua Macacaúba',
        localidade: 'Manaus',
        regiao: 'Norte',
        uf: 'AM',
      },
    };

    const useCase = new CreateUserUseCase(userRepository);

    void expect(async () => {
      await useCase.execute(createUserDto);
    }).rejects.toThrow('Já existe um usuário com esse email');
  });
});
