import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/users.controller';
import { CreateUserUseCase } from './application/create-user/create-user.use-case';
import { PrismaUserRepository } from './infrastructure/user.repository'; // Fix import path if needed
import { UserMapper } from './infrastructure/user.mapper';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    UserMapper,
    {
      provide: 'UserRepositoryPort',
      useClass: PrismaUserRepository,
    },
  ],
  exports: ['UserRepositoryPort', CreateUserUseCase, UserMapper],
})
export class UsersModule {}
