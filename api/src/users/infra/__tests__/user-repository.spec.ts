import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from '../user.repository';
import {
  User,
  UserContructorProps,
  UserId,
} from 'src/users/domain/entities/user.entity';
import { Address } from 'src/shared/value-objects/address.vo';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('save', () => {
    it('should save user successfully', async () => {
      const props: UserContructorProps = {
        name: 'Jonh Doe',
        email: 'jonh@mail.com',
        address: Address.create({
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

      const saveSpy = jest.spyOn(userRepository, 'save');
      const createSpy = jest.spyOn(prismaService.user, 'create');

      await userRepository.save(user);

      expect(saveSpy).toHaveBeenCalledWith(user);
      expect(createSpy).toHaveBeenCalledWith({
        data: {
          id: user.id.toString(),
          createdAt: user.createdAt,
          email: user.email,
          name: user.name,
          password: user.password,
          updatedAt: user.updatedAt,
          address: {
            create: {
              bairro: user.address.bairro,
              cep: user.address.cep,
              complemento: user.address.complemento,
              estado: user.address.estado,
              localidade: user.address.localidade,
              logradouro: user.address.logradouro,
              regiao: user.address.regiao,
              uf: user.address.uf,
            },
          },
        },
      });
    });
  });

  describe('findByEmail', () => {
    it('should find user by email successfully', async () => {
      const props: UserContructorProps = {
        name: 'Jonh Doe',
        email: 'jonh@mail.com',
        address: Address.create({
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

      const findUniqueSpy = jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue({
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          password: '234567',
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          addressId: user.address.id,
        });

      const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail');
      const result = await userRepository.findByEmail(user.email);

      expect(findByEmailSpy).toHaveBeenCalledWith(user.email);
      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { email: props.email },
        include: { address: true },
      });
      expect(result?.id).toEqual(user.id);
      expect(result?.name).toEqual(user.name);
      expect(result?.email).toEqual(user.email);
      expect(result?.password).toEqual('234567');
      expect(result?.createdAt).toEqual(user.createdAt);
      expect(result?.updatedAt).toEqual(user.updatedAt);
      expect(result?.address).toBeDefined();
    });

    it('should return null if user not found', async () => {
      const email = 'email-not-found';
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const user = await userRepository.findByEmail(email);

      expect(user).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find user by id successfully', async () => {
      const props: UserContructorProps = {
        name: 'Jonh Doe',
        email: 'jonh@mail.com',
        address: Address.create({
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

      const findUniqueSpy = jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue({
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          password: '234567',
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          addressId: user.address.id,
        });

      const findByIdSpy = jest.spyOn(userRepository, 'findById');
      const result = await userRepository.findById(user.id);

      expect(findByIdSpy).toHaveBeenCalledWith(user.id);
      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { id: user.id?.toString() },
        include: { address: true },
      });
      expect(result?.id).toEqual(user.id);
      expect(result?.name).toEqual(user.name);
      expect(result?.email).toEqual(user.email);
      expect(result?.password).toEqual('234567');
      expect(result?.createdAt).toEqual(user.createdAt);
      expect(result?.updatedAt).toEqual(user.updatedAt);
      expect(result?.address).toBeDefined();
    });

    it('should return null if user not found', async () => {
      const userId = new UserId();
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const user = await userRepository.findById(userId);

      expect(user).toBeNull();
    });
  });
});
