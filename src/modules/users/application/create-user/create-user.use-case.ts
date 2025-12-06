import { Inject, Injectable, ConflictException } from '@nestjs/common';
import type { UserRepositoryPort } from '../../domain/user.repository.port';
import { UserEntity } from '../../domain/user.entity';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../../domain/user.types';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOneByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new UserEntity({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
      role: dto.role || UserRole.USER,
    });

    await this.userRepository.insert(user);

    return user;
  }
}
