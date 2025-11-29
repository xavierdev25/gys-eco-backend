import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { ProductEntity } from '../domain/product.entity';
import { ProductMapper } from './product.mapper';

@Injectable()
export class PrismaProductRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ProductMapper,
  ) { }

  async insert(entity: ProductEntity): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    await this.prisma.product.create({ data: record });
  }

  async findOneById(id: string): Promise<ProductEntity | undefined> {
    const record = await this.prisma.product.findUnique({ where: { id } });
    return record ? this.mapper.toDomain(record) : undefined;
  }

  async findAll(): Promise<ProductEntity[]> {
    const records = await this.prisma.product.findMany();
    return records.map((record) => this.mapper.toDomain(record));
  }

  async findAllByCategoryId(categoryId: string): Promise<ProductEntity[]> {
    const records = await this.prisma.product.findMany({
      where: { categoryId },
    });
    return records.map((record) => this.mapper.toDomain(record));
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.product.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
