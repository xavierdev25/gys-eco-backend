import { Injectable } from '@nestjs/common';
import { Mapper } from '../../../shared/infrastructure/mapper.interface';
import { UserEntity } from '../domain/user.entity';
import { User as PrismaUser } from '@prisma/client';
import { UserResponseDto } from '../application/user.dto';
import { UserRole } from '../domain/user.types';

@Injectable()
export class UserMapper
  implements Mapper<UserEntity, PrismaUser, UserResponseDto>
{
  toPersistence(entity: UserEntity): PrismaUser {
    const props = entity['props'];
    return {
      id: entity.id,
      email: props.email,
      password: props.password || '',
      name: props.name || null,
      role: props.role,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      deletedAt: props.deletedAt || null,
    };
  }

  toDomain(record: PrismaUser): UserEntity {
    return new UserEntity(
      {
        email: record.email,
        password: record.password,
        name: record.name,
        role: record.role as UserRole,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        deletedAt: record.deletedAt,
      },
      record.id,
    );
  }

  toResponse(entity: UserEntity): UserResponseDto {
    const props = entity['props'];
    return {
      id: entity.id,
      email: props.email,
      name: props.name || null,
      role: props.role,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
  }
}
