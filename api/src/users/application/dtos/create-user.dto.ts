// import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class AddressDto {
  @IsString({ message: 'cep precisa ser uma string' })
  @IsNotEmpty({ message: 'cep não pode ser vazio' })
  // @Matches('')
  cep: string;

  @IsString({ message: 'logradouro precisa ser uma string' })
  @IsNotEmpty({ message: 'logradouro não pode ser vazio' })
  logradouro: string;

  @IsString({ message: 'complemento precisa ser uma string' })
  @IsNotEmpty({ message: 'complemento não pode ser vazio' })
  complemento: string;

  @IsString({ message: 'bairro precisa ser uma string' })
  @IsNotEmpty({ message: 'bairro não pode ser vazio' })
  bairro: string;

  @IsString({ message: 'localidade precisa ser uma string' })
  @IsNotEmpty({ message: 'localidade não pode ser vazio' })
  localidade: string;

  @IsString({ message: 'uf precisa ser uma string' })
  @IsNotEmpty({ message: 'uf não pode ser vazio' })
  uf: string;

  @IsString({ message: 'estado precisa ser uma string' })
  @IsNotEmpty({ message: 'estado não pode ser vazio' })
  estado: string;

  @IsString({ message: 'regiao precisa ser uma string' })
  @IsNotEmpty({ message: 'regiao não pode ser vazio' })
  regiao: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'Jonh Doe' })
  @IsString({ message: 'name deve ser uma string' })
  @IsNotEmpty({ message: 'name não pode ser vazio' })
  name: string;

  @ApiProperty({ example: 'jonhdoe@mail.com' })
  @IsEmail({}, { message: 'email inválido' })
  @IsNotEmpty({ message: 'email não pode ser vazio' })
  email: string; // tratar (toLowerCase, trim())

  @ApiProperty({ example: '1234' })
  @IsString({ message: 'password deve ser uma string' })
  @IsNotEmpty({ message: 'password não pode ser vazio' })
  password: string;

  @ApiProperty({
    example: {
      cep: '69018-660',
      logradouro: 'Rua Macacaúba',
      complemento: '(Res V Melhor - 2 etapa',
      bairro: 'Lago Azul',
      localidade: 'Manaus',
      uf: 'AM',
      estado: 'Amazonas',
      regiao: 'Norte',
    },
  })
  @IsObject({ message: 'address deve ser um json' })
  address: AddressDto;
}
