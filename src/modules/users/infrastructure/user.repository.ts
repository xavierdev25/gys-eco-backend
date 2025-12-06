import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { UserRepositoryPort } from '../domain/user.repository.port';
import { UserEntity } from '../domain/user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
  ) {}

  async insert(entity: UserEntity): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    await this.prisma.user.create({ data: record });
  }

  async findOneById(id: string): Promise<UserEntity | undefined> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    return record ? this.mapper.toDomain(record) : undefined;
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    const record = await this.prisma.user.findUnique({ where: { email } });
    return record ? this.mapper.toDomain(record) : undefined;
  }

  async findAll(): Promise<UserEntity[]> {
    const records = await this.prisma.user.findMany();
    return records.map((record) => this.mapper.toDomain(record));
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
