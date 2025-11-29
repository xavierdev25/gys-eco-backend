import { RepositoryPort } from '../../../shared/domain/repository.port';
import { UserEntity } from './user.entity';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity | undefined>;
}
