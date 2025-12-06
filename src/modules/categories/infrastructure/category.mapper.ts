import { Injectable } from '@nestjs/common';
import { Mapper } from '../../../shared/infrastructure/mapper.interface';
import { CategoryEntity } from '../domain/category.entity';
import { Category as PrismaCategory } from '@prisma/client';
import { CategoryResponseDto } from '../application/category.dto';

@Injectable()
export class CategoryMapper
  implements Mapper<CategoryEntity, PrismaCategory, CategoryResponseDto>
{
  toPersistence(entity: CategoryEntity): PrismaCategory {
    const props = entity['props'];
    return {
      id: entity.id,
      name: props.name,
      slug: props.slug,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      deletedAt: props.deletedAt || null,
    };
  }

  toDomain(record: PrismaCategory): CategoryEntity {
    return new CategoryEntity(
      {
        name: record.name,
        slug: record.slug,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        deletedAt: record.deletedAt,
      },
      record.id,
    );
  }

  toResponse(entity: CategoryEntity): CategoryResponseDto {
    const props = entity['props'];
    return {
      id: entity.id,
      name: props.name,
      slug: props.slug,
    };
  }
}
