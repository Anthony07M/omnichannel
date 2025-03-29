import { RepositoryInterface } from 'src/shared/repositories/repository.interface';
import { User, UserId } from '../entities/user.entity';

export interface UserRepositoryInterface
  extends RepositoryInterface<User, UserId> {
  save(user: User): Promise<void>;
  findById(userId: UserId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
