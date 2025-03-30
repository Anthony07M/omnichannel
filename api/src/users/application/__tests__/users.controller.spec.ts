import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { CreateUserUseCase } from 'src/users/usecases/create-user.usecase';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create user success', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'jonh@mail.com',
      password: '123456',
      address: {
        cep: '69018-660',
        logradouro: 'Rua Macacaúba',
        complemento: '(Res V Melhor - 2 etapa',
        bairro: 'Lago Azul',
        localidade: 'Manaus',
        uf: 'AM',
        estado: 'Amazonas',
        regiao: 'Norte',
      },
    };

    jest.spyOn(controller['createUserUseCase'], 'execute').mockResolvedValue({
      id: '0195e843-9971-74ce-81c2-88e97c36daa8',
      email: createUserDto.email,
      name: createUserDto.name,
      address: {
        id: '0195e843-9971-74ce-81c2-88e97c36daa8',
        ...createUserDto.address,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await controller.create(createUserDto);

    expect(user.id).toEqual(expect.any(String));
    expect(user.email).toEqual(createUserDto.email);
    expect(user.name).toEqual(createUserDto.name);
    expect(user.address.id).toEqual(expect.any(String));
    expect(user.address.cep).toEqual(createUserDto.address.cep);
    expect(user.address.logradouro).toEqual(createUserDto.address.logradouro);
    expect(user.address.complemento).toEqual(createUserDto.address.complemento);
    expect(user.address.bairro).toEqual(createUserDto.address.bairro);
    expect(user.address.localidade).toEqual(createUserDto.address.localidade);
    expect(user.address.uf).toEqual(createUserDto.address.uf);
    expect(user.address.estado).toEqual(createUserDto.address.estado);
    expect(user.address.regiao).toEqual(createUserDto.address.regiao);
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('should be called create user use case', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'jonh@mail.com',
      password: '123456',
      address: {
        cep: '69018-660',
        logradouro: 'Rua Macacaúba',
        complemento: '(Res V Melhor - 2 etapa',
        bairro: 'Lago Azul',
        localidade: 'Manaus',
        uf: 'AM',
        estado: 'Amazonas',
        regiao: 'Norte',
      },
    };

    const executeSpy = jest.spyOn(controller['createUserUseCase'], 'execute');
    const controllerSpy = jest.spyOn(controller, 'create');

    await controller.create(createUserDto);

    expect(executeSpy).toHaveBeenCalledWith(createUserDto);
    expect(controllerSpy).toHaveBeenCalledWith(createUserDto);
  });
});
