import { PrismaService } from 'src/prisma/prisma.service';
import { UserId, User } from '../domain/entities/user.entity';
import { UserRepositoryInterface } from '../domain/repositories/user.repository';
import { Address } from 'src/shared/value-objects/address.vo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prismaService.user.create({
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
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { address: true },
    });

    if (!user) {
      return null;
    }

    return User.create({
      id: new UserId(user.id),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      address: Address.create({ ...user.address }),
    });
  }

  async findById(userId: UserId): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId.toString() },
      include: { address: true },
    });

    if (!user) {
      return null;
    }

    return User.create({
      id: new UserId(user.id),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      address: Address.create({ ...user.address }),
    });
  }
}
