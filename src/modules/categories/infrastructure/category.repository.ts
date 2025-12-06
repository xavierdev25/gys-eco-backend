import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
// import { CategoryRepositoryPort } from '../domain/category.repository.port';
import { CategoryEntity } from '../domain/category.entity';
import { CategoryMapper } from './category.mapper';

@Injectable()
export class PrismaCategoryRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: CategoryMapper,
  ) {}

  async insert(entity: CategoryEntity): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    await this.prisma.category.create({ data: record });
  }

  async findOneById(id: string): Promise<CategoryEntity | undefined> {
    const record = await this.prisma.category.findUnique({ where: { id } });
    return record ? this.mapper.toDomain(record) : undefined;
  }

  async findOneBySlug(slug: string): Promise<CategoryEntity | undefined> {
    const record = await this.prisma.category.findUnique({ where: { slug } });
    return record ? this.mapper.toDomain(record) : undefined;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const records = await this.prisma.category.findMany();
    return records.map((record) => this.mapper.toDomain(record));
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.category.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
