import { UserRepositoryInterface } from './domain/repositories/user.repository';
import { UserRepository } from './infra/user.repository';
import { CreateUserUseCase } from './usecases/create-user.usecase';

const REPOSITORIES = {
  USER_REPOSITORY: {
    provide: 'UserRepository',
    useClass: UserRepository,
  },
};

const USE_CASES = {
  CREATE_USER_USE_CASE: {
    provide: CreateUserUseCase,
    useFactory: (userRepository: UserRepositoryInterface) => {
      return new CreateUserUseCase(userRepository);
    },
    inject: [REPOSITORIES.USER_REPOSITORY.provide],
  },
};

export const USER_PROVIDERS = { REPOSITORIES, USE_CASES };
