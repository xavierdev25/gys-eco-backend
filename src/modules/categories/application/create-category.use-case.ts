import { Inject, Injectable, ConflictException } from '@nestjs/common';
import type { CategoryRepositoryPort } from '../domain/category.repository.port';
import { CategoryEntity } from '../domain/category.entity';
import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepositoryPort')
    private readonly categoryRepository: CategoryRepositoryPort,
  ) { }

  async execute(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const existing = await this.categoryRepository.findOneBySlug(dto.slug);
    if (existing) {
      throw new ConflictException('Category already exists');
    }

    const category = new CategoryEntity({
      name: dto.name,
      slug: dto.slug,
    });

    await this.categoryRepository.insert(category);

    return category;
  }
}
