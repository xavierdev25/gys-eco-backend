import { Module } from '@nestjs/common';
import { CategoriesController } from './infrastructure/categories.controller';
import { CreateCategoryUseCase } from './application/create-category.use-case';
import { PrismaCategoryRepository } from './infrastructure/category.repository';
import { CategoryMapper } from './infrastructure/category.mapper';

@Module({
  controllers: [CategoriesController],
  providers: [
    CreateCategoryUseCase,
    CategoryMapper,
    {
      provide: 'CategoryRepositoryPort',
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: ['CategoryRepositoryPort'],
})
export class CategoriesModule {}
