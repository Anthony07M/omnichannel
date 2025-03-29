import { Address } from 'src/shared/value-objects/address.vo';
import { User } from '../domain/entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../domain/repositories/user.repository';

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  address: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
  };
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute({ name, email, password, address }: CreateUserDto) {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new ConflictException('Já existe um usuário com esse email');
    }

    const _address = Address.create({ ...address });
    const user = User.create({ name, email, password, address: _address });

    await this.userRepository.save(user);

    return user;
  }
}
