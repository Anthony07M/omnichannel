import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserUseCase } from '../usecases/create-user.usecase';

@Controller('users')
export class UsersController {
  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase;

  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }
}
