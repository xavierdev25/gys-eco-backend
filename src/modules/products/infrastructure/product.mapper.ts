import { Injectable } from '@nestjs/common';
import { Mapper } from '../../../shared/infrastructure/mapper.interface';
import { ProductEntity } from '../domain/product.entity';
import { Product as PrismaProduct } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { ProductResponseDto } from '../application/product.dto';

@Injectable()
export class ProductMapper
  implements Mapper<ProductEntity, PrismaProduct, ProductResponseDto>
{
  toPersistence(entity: ProductEntity): PrismaProduct {
    const props = entity['props'];
    return {
      id: entity.id,
      name: props.name,
      slug: props.slug,
      description: props.description || null,
      price: new Decimal(props.price),
      stock: props.stock,
      categoryId: props.categoryId,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      deletedAt: props.deletedAt || null,
    };
  }

  toDomain(record: PrismaProduct): ProductEntity {
    return new ProductEntity(
      {
        name: record.name,
        slug: record.slug,
        description: record.description,
        price: Number(record.price),
        stock: record.stock,
        categoryId: record.categoryId,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        deletedAt: record.deletedAt,
      },
      record.id,
    );
  }

  toResponse(entity: ProductEntity): ProductResponseDto {
    const props = entity['props'];
    return {
      id: entity.id,
      name: props.name,
      slug: props.slug,
      price: props.price,
      stock: props.stock,
      categoryId: props.categoryId,
    };
  }
}
